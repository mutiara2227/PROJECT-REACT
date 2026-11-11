import { CalendarDays, Trash2, CheckCircle2, Circle } from 'lucide-react';

function TaskCard({ task, onToggle, onDelete }) {
  return (
    <div className={`task-card ${task.completed ? 'completed' : ''}`}>
      <div className="task-info">
        <button
          className="task-check"
          onClick={() => onToggle(task.id)}
          title="Ubah status tugas"
        >
          {task.completed ? (
            <CheckCircle2 size={21} />
          ) : (
            <Circle size={21} />
          )}
        </button>

        <div>
          <h4>{task.title}</h4>
          <p>{task.subject}</p>

          <span className="task-deadline">
            <CalendarDays size={14} />
            {task.deadline}
          </span>
        </div>
      </div>

      <button
        className="delete-button"
        onClick={() => onDelete(task.id)}
        title="Hapus tugas"
      >
        <Trash2 size={17} />
      </button>
    </div>
  );
}

export default TaskCard;