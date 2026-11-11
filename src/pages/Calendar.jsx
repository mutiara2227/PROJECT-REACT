import { useState } from 'react';
import Navbar from '../components/Navbar';
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';

function Calendar({ tasks }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthName = currentDate.toLocaleDateString('id-ID', {
    month: 'long',
    year: 'numeric'
  });

  const changeMonth = (amount) => {
    setCurrentDate(new Date(year, month + amount, 1));
  };

  const getTasks = (day) => {
    return tasks.filter((task) => {
      let taskDate;

      // Format YYYY-MM-DD
      if (/^\d{4}-\d{2}-\d{2}$/.test(task.deadline)) {
        const [y, m, d] = task.deadline.split('-').map(Number);

        taskDate = new Date(y, m - 1, d);
      } else {
        // Format tanggal lainnya
        taskDate = new Date(task.deadline);
      }

      if (isNaN(taskDate.getTime())) {
        return false;
      }

      return (
        taskDate.getFullYear() === year &&
        taskDate.getMonth() === month &&
        taskDate.getDate() === day
      );
    });
  };

  return (
    <>
      <Navbar
        title="Calendar"
        subtitle="Lihat jadwal dan deadline tugasmu"
      />

      <section className="content-section">
        <div className="calendar-header">
          <h3>{monthName}</h3>

          <div>
            <button onClick={() => changeMonth(-1)}>
              <ChevronLeft />
            </button>

            <button onClick={() => changeMonth(1)}>
              <ChevronRight />
            </button>
          </div>
        </div>

        <div className="calendar-grid">
          {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(day => (
            <div className="calendar-day-name" key={day}>
              {day}
            </div>
          ))}

          {Array.from({ length: firstDay }, (_, index) => (
            <div className="calendar-date empty" key={`empty-${index}`} />
          ))}

          {Array.from({ length: daysInMonth }, (_, index) => {
            const day = index + 1;
            const dayTasks = getTasks(day);

            return (
              <div className="calendar-date" key={day}>
                <span>{day}</span>

                {dayTasks.map(task => (
                  <div className="calendar-task" key={task.id}>
                    {task.title}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </section>

      <section className="content-section">
        <h3><CalendarDays size={19} /> Daftar Deadline</h3>

        {tasks.length > 0 ? (
          tasks.map(task => (
            <div className="calendar-task-list" key={task.id}>
              <div>
                <strong>{task.title}</strong>
                <p>{task.subject}</p>
              </div>
              <span>{task.deadline}</span>
            </div>
          ))
        ) : (
          <p className="empty-message">Belum ada deadline tugas.</p>
        )}
      </section>
    </>
  );
}

export default Calendar;
