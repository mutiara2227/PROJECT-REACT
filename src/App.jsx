import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Sidebar from './components/Sidebar';

import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Schedule from './pages/Schedule';
import Calendar from './pages/Calendar';
import About from './pages/About';

import { initialTasks, initialSchedules } from './data/initialData';

import './App.css';

function AppContent() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('studentTasks');

    return savedTasks
      ? JSON.parse(savedTasks)
      : initialTasks;
  });

  const [schedules, setSchedules] = useState(() => {
    const savedSchedules = localStorage.getItem('studentSchedules');

    return savedSchedules
      ? JSON.parse(savedSchedules)
      : initialSchedules;
  });

    // Menyimpan tugas ke LocalStorage
  useEffect(() => {
    localStorage.setItem('studentTasks', JSON.stringify(tasks));
  }, [tasks]);

  // Menyimpan jadwal ke LocalStorage
  useEffect(() => {
    localStorage.setItem(
      'studentSchedules',
      JSON.stringify(schedules)
    );
  }, [schedules]);

  // Menambahkan tugas
  const addTask = (newTask) => {
    setTasks([
      ...tasks,
      {
        ...newTask,
        id: Date.now(),
        completed: false
      }
    ]);
  };

  // Mengubah status tugas
  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    ));
  };

  // Menghapus tugas
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Mengedit tugas
  const editTask = (id, updatedTask) => {
    setTasks(tasks.map(task =>
      task.id === id
        ? { ...task, ...updatedTask }
        : task
    ));
  };

  // Menambahkan jadwal
  const addSchedule = (newSchedule) => {
    setSchedules([
      ...schedules,
      {
        ...newSchedule,
        id: Date.now()
      }
    ]);
  };

  // Mengedit jadwal
  const editSchedule = (id, updatedSchedule) => {
    setSchedules(schedules.map(schedule =>
      schedule.id === id
        ? { ...schedule, ...updatedSchedule }
        : schedule
    ));
  };

  // Menghapus jadwal
  const deleteSchedule = (id) => {
    setSchedules(schedules.filter(schedule =>
      schedule.id !== id
    ));
  };

  return (
    <div className="app-container">
      <Sidebar />

      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                tasks={tasks}
                schedules={schedules}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            }
          />

          <Route
            path="/tasks"
            element={
              <Tasks
                tasks={tasks}
                onAdd={addTask}
                onToggle={toggleTask}
                onDelete={deleteTask}
                onEdit={editTask}
              />
            }
          />

          <Route
            path="/schedule"
            element={
              <Schedule
                schedules={schedules}
                onAdd={addSchedule}
                onEdit={editSchedule}
                onDelete={deleteSchedule}
              />
            }
          />

          <Route
            path="/calendar"
            element={<Calendar tasks={tasks} />}
          />

          <Route
            path="/about"
            element={<About />}
          />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
