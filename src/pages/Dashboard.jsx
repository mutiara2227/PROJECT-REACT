import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';
import ScheduleCard from '../components/ScheduleCard';
import { ClipboardList, CheckCircle2, Clock, Bell, AlertCircle } from 'lucide-react';

function Dashboard({ tasks, schedules, onToggle, onDelete }) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const today = new Date();

  const todayNumber = Date.UTC(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const reminders = tasks
    .filter(task => !task.completed && task.deadline)
    .map(task => {
      const [year, month, day] = task.deadline.split('-').map(Number);

      const deadlineNumber = Date.UTC(year, month - 1, day);

      const daysLeft = Math.round(
        (deadlineNumber - todayNumber) / 86400000
      );

      return { ...task, daysLeft };
    })
    .filter(task => task.daysLeft <= 3)
    .sort((a, b) => a.daysLeft - b.daysLeft);

  const getReminderText = (daysLeft) => {
    if (daysLeft < 0) return 'Terlambat';
    if (daysLeft === 0) return 'Deadline Hari Ini';
    if (daysLeft === 1) return 'Besok Deadline';

    return `${daysLeft} hari lagi`;
  };

  const getReminderClass = (daysLeft) => {
    if (daysLeft < 0) return 'reminder-overdue';
    if (daysLeft === 0) return 'reminder-today';

    return 'reminder-upcoming';
  };

  return (
    <>
      <Navbar
        title="Dashboard"
        subtitle="Ringkasan aktivitas perkuliahanmu"
      />

      <section className="dashboard-welcome">
        <h2>Welcome back, Student!</h2>
        <p>Yuk, atur kegiatan kuliahmu agar lebih terorganisir.</p>
      </section>

      <section className="stats-container">
        <div className="stat-card">
          <ClipboardList size={24} color="#9a795b" />
          <h3>Total Tugas</h3>
          <h2>{totalTasks}</h2>
        </div>

        <div className="stat-card">
          <CheckCircle2 size={24} color="#78916d" />
          <h3>Tugas Selesai</h3>
          <h2>{completedTasks}</h2>
        </div>

        <div className="stat-card">
          <Clock size={24} color="#c49a68" />
          <h3>Belum Selesai</h3>
          <h2>{pendingTasks}</h2>
        </div>
      </section>

      <section className="content-section">
        <div className="section-header">
          <h3>
            <Bell size={19} />
            Pengingat Deadline
          </h3>
        </div>

        {reminders.length > 0 ? (
          reminders.map(task => (
            <div
              className={`deadline-reminder ${getReminderClass(task.daysLeft)}`}
              key={task.id}
            >
              <AlertCircle size={21} />

              <div className="reminder-info">
                <h4>{task.title}</h4>
                <p>{task.subject}</p>
                <span>Deadline: {task.deadline}</span>
              </div>

              <strong>
                {getReminderText(task.daysLeft)}
              </strong>
            </div>
          ))
        ) : (
          <p className="empty-message">
            Tidak ada deadline dalam waktu dekat. Hebat!
          </p>
        )}
      </section>

      <section className="content-section">
        <div className="section-header">
          <h3>Recent Tasks</h3>
        </div>

        {tasks.length > 0 ? (
          tasks.slice(0, 4).map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))
        ) : (
          <p>Belum ada tugas.</p>
        )}
      </section>

      <section className="content-section">
        <div className="section-header">
          <h3>Upcoming Schedule</h3>
        </div>

        {schedules.length > 0 ? (
          schedules.map(schedule => (
            <ScheduleCard
              key={schedule.id}
              schedule={schedule}
            />
          ))
        ) : (
          <p>Belum ada jadwal kuliah.</p>
        )}
      </section>
    </>
  );
}

export default Dashboard;