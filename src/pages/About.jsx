import Navbar from '../components/Navbar';
import {
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Heart
} from 'lucide-react';

function About() {
  return (
    <>
      <Navbar
        title="About"
        subtitle="Kenali lebih dekat Student Planner"
      />

      <section className="content-section about-section">
        <div className="about-icon">
          <BookOpen size={40} />
        </div>

        <h2>About Student Planner</h2>

        <p>
          Student Planner adalah website yang dirancang untuk membantu
          mahasiswa mengatur tugas kuliah, jadwal perkuliahan, dan
          deadline agar aktivitas akademik menjadi lebih terorganisir.
        </p>

        <div className="about-features">
          <div>
            <CheckCircle2 size={22} />
            <h4>Task Management</h4>
            <p>Kelola tugas kuliah dengan mudah.</p>
          </div>

          <div>
            <CalendarDays size={22} />
            <h4>Class Schedule</h4>
            <p>Atur jadwal perkuliahanmu.</p>
          </div>

          <div>
            <Heart size={22} />
            <h4>Easy to Use</h4>
            <p>Tampilan sederhana dan nyaman digunakan.</p>
          </div>
        </div>

        <div className="about-footer">
          Made with <Heart size={15} fill="currentColor" /> for students.
        </div>
      </section>
    </>
  );
}

export default About;
