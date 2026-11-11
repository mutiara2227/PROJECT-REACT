import { UserRound } from 'lucide-react';

function Navbar({ title, subtitle }) {
  return (
    <header className="navbar">
      <div>
        <h1 className="page-title">{title}</h1>
        <p className="page-subtitle">{subtitle}</p>
      </div>

      <div className="user-profile">
        <div className="user-icon">
          <UserRound size={20} />
        </div>
        <span>Student</span>
      </div>
    </header>
  );
}

export default Navbar;