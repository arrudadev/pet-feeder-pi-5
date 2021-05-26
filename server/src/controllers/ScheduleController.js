import { ScheduleModel } from '../models/ScheduleModel';

export class ScheduleController {
  async handleCreateSchedule(request, response) {
    try {
      const { schedule_hour } = request.body;

      const scheduleId = await new ScheduleModel().create(schedule_hour);      

      return response.json({ schedule_id: scheduleId });
    } catch (error) {
      console.log(error);
      return response.status(500).json({ error: error }); 
    }
  }

  async handleFindSchedules(request, response) {
    try {
      const schedules = await new ScheduleModel().find();      

      return response.json({ schedules });
    } catch (error) {
      console.log(error);
      return response.status(500).json({ error: error }); 
    }
  }

  async handleUpdateSchedule(request, response) {
    try {
      const { schedule_hour, schedule_id } = request.body;

      await new ScheduleModel().update(schedule_hour, schedule_id);

      return response.json({ success: true });
    } catch (error) {
      console.log(error);
      return response.status(500).json({ error: error }); 
    }
  }

  async handleDeleteSchedule(request, response) {
    try {
      const { schedule_id } = request.body;

      await new ScheduleModel().delete(schedule_id);

      return response.json({ success: true });
    } catch (error) {
      console.log(error);
      return response.status(500).json({ error: error }); 
    }
  }
}