import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';
import ScheduleCard from '../components/ScheduleCard';
import { ClipboardList, CheckCircle2, Clock } from 'lucide-react';

function Dashboard({ tasks, schedules, onToggle, onDelete }) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

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