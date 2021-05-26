import { FeedModel } from '../models/FeedModel';

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

  async handleFindLastFeed(request, response) {
    try {
      const feedModel = new FeedModel();

      const feed = await feedModel.findLast();      

      if (feed && feed.FEED_STATUS === 'S') {
        return response.json({ 
          feed: {
            feed_id: feed.FEED_ID,
            feed_date: feed.FEED_DATE,
            feed_hour: feed.FEED_HOUR,
          }
        });
      }

      if (feed && feed.FEED_STATUS === 'N') {
        const feedStatusOk = await feedModel.findLastByStatus('S');

        if (feedStatusOk) {
          return response.json({ 
            feed: {
              feed_id: feedStatusOk.FEED_ID,
              feed_date: feedStatusOk.FEED_DATE,
              feed_hour: feedStatusOk.FEED_HOUR,
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
      const feedModel = new FeedModel();

      const feed = await feedModel.findLast();

      if (feed && feed.FEED_STATUS === 'N') {
        await feedModel.update(feed.FEED_ID);

        return response.json({ success: true });
      } 
      
      const statusFeed = 'S';

      await feedModel.create(statusFeed);      

      return response.json({ success: true });
    } catch (error) {
      console.log(error);
      return response.status(500).json({ error: error }); 
    }
  }
}