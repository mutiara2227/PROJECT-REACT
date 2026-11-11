import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ClipboardList,
  CalendarDays,
  CalendarRange,
  Info,
  Menu,
  X
} from 'lucide-react';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        className="mobile-menu-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={closeSidebar}
        />
      )}

      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <h1 className="logo">Student Planner</h1>

        <nav className="sidebar-menu">
          <NavLink to="/" end onClick={closeSidebar}>
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>

          <NavLink to="/tasks" onClick={closeSidebar}>
            <ClipboardList size={20} />
            My Tasks
          </NavLink>

          <NavLink to="/schedule" onClick={closeSidebar}>
            <CalendarDays size={20} />
            Schedule
          </NavLink>

          <NavLink to="/calendar" onClick={closeSidebar}>
            <CalendarRange size={20} />
            Calendar
          </NavLink>

          <NavLink to="/about" onClick={closeSidebar}>
            <Info size={20} />
            About
          </NavLink>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;