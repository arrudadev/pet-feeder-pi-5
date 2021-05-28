import { FeedModel } from '../models/FeedModel';
import { ScheduleModel } from '../models/ScheduleModel';

import { convertScheduleHourInDateFormat } from '../utils/convertScheduleHourInDateFormat';
import { formatDateInHour } from '../utils/formatDateInHour';

export class FeedController {
  async handleCreateFeed(request, response) {
    try {
      const { feed_status } = request.body;

      await new FeedModel().create(feed_status);      

      return response.json({ success: true });
    } catch (error) {
      console.log(error);
      return response.status(500).json({ error: error }); 
    }
  }

  async handleFindAllFeeds(request, response) {
    try {      
      const feeds = await new FeedModel().find();      

      return response.json({ feeds });
    } catch (error) {
      console.log(error);
      return response.status(500).json({ error: error }); 
    }
  }

  async handleFindLastFeed(request, response) {
    try {
      const feedModel = new FeedModel();

      const feed = await feedModel.findLast();      

      if (feed && feed.FEED_STATUS === 'S') {
        const feedDate = new Date(feed.FEED_DATE);

        feedDate.setDate(feedDate.getDate() + 1);

        return response.json({ 
          feed: {
            feed_id: feed.FEED_ID,
            feed_date: feedDate,
            feed_hour: convertScheduleHourInDateFormat(feed.FEED_HOUR),
            feed_weight: feed.FEED_WEIGHT
          }
        });
      }

      if (feed && feed.FEED_STATUS === 'N') {
        const feedStatusOk = await feedModel.findLastByStatus('S');

        const feedDate = new Date(feedStatusOk.FEED_DATE);

        feedDate.setDate(feedDate.getDate() + 1);

        if (feedStatusOk) {
          return response.json({ 
            feed: {
              feed_id: feedStatusOk.FEED_ID,
              feed_date: feedDate,
              feed_hour: convertScheduleHourInDateFormat(feedStatusOk.FEED_HOUR),
              feed_weight: feedStatusOk.FEED_WEIGHT
            }
          });
        }
      }
  
      return response.json({ feed: {} });
    } catch (error) {
      console.log(error);
      return response.status(500).json({ error: error }); 
    }
  }

  async handleUpdateFeed(request, response) {
    try {
      const { feed_weight } = request.body;

      const feedModel = new FeedModel();

      const feed = await feedModel.findLast();

      if (feed && feed.FEED_STATUS === 'N') {
        await feedModel.update(feed.FEED_ID, feed_weight);

        return response.json({ success: true });
      } 
      
      const statusFeed = 'S';

      await feedModel.create(statusFeed, feed_weight);

      return response.json({ success: true });
    } catch (error) {
      console.log(error);
      return response.status(500).json({ error: error }); 
    }
  }


  async handleVerifyNeedFeed(request, response) {
    try {
      const feedModel = new FeedModel();
      const scheduleModel = new ScheduleModel();
  
      const lastFeed = await feedModel.findLast();

      if (lastFeed && lastFeed.FEED_STATUS === 'N') {
        return response.json({ feed: 'FEED_NOW' });
      }

      const schedules = await scheduleModel.find();

      const currentDate = new Date();

      const currentDateMonth = currentDate.getMonth() + 1 < 10 ? `0${currentDate.getMonth() + 1}` : currentDate.getMonth() + 1;
      const currentDateDay = currentDate.getDate() < 10 ? `0${currentDate.getDate()}` : currentDate.getDate();

      const currentDateFormated = `${currentDate.getFullYear()}-${currentDateMonth}-${currentDateDay}`;

      let feedStatus = 'NO_FEED';

      schedules.map(schedule => {
        if (feedStatus === 'NO_FEED') {
          const currentSchedule = new Date(schedule.schedule_hour);
          const currentSchedulePlusOneMinute = new Date(schedule.schedule_hour);
          const currentScheduleLessOneMinute = new Date(schedule.schedule_hour);

          currentSchedulePlusOneMinute.setTime(currentSchedulePlusOneMinute.getTime() + 1000 * 60);

          currentScheduleLessOneMinute.setTime(currentScheduleLessOneMinute.getTime() - 1000 * 60);

          if (currentDate >= currentScheduleLessOneMinute && currentDate <= currentSchedulePlusOneMinute) {
            if (lastFeed) {
              const lastFeedDate = new Date(convertScheduleHourInDateFormat(lastFeed.FEED_HOUR));

              if (lastFeedDate >= currentScheduleLessOneMinute && lastFeedDate <= currentSchedulePlusOneMinute && currentDateFormated === lastFeed.FEED_DATE) {
                feedStatus = 'NO_FEED';
              } else {
                feedStatus = 'FEED_NOW';
              }
            } else {
              feedStatus = 'FEED_NOW';
            }
          } else {
            feedStatus = 'NO_FEED';
        }
        }
      });

      return response.json({ feed: feedStatus });
    } catch (error) {
      console.log(error);
      return response.status(500).json({ error: error }); 
    }
  }
}