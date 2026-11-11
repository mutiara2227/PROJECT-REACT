import { Clock3, MapPin } from 'lucide-react';

function ScheduleCard({ schedule }) {
  return (
    <div className="schedule-card">
      <div className="schedule-time">
        <Clock3 size={17} />
        <span>{schedule.time}</span>
      </div>

      <div className="schedule-info">
        <h4>{schedule.subject}</h4>
        <p>{schedule.day}</p>

        <span>
          <MapPin size={14} />
          {schedule.room}
        </span>
      </div>
    </div>
  );
}

export default ScheduleCard;