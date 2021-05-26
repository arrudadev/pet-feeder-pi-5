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
}