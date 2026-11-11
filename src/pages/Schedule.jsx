import { useState } from 'react';
import Navbar from '../components/Navbar';
import ScheduleCard from '../components/ScheduleCard';
import { Plus, X, Trash2, Pencil } from 'lucide-react';

function Schedule({ schedules, onAdd, onEdit, onDelete }) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    subject: '',
    day: '',
    time: '',
    room: ''
  });


    const handleSubmit = (e) => {
    e.preventDefault();

    if (
        !formData.subject.trim() ||
        !formData.day ||
        !formData.time.trim() ||
        !formData.room.trim()
    ) {
        alert('Semua data jadwal harus diisi!');
        return;
    }

    const cleanData = {
        subject: formData.subject.trim(),
        day: formData.day,
        time: formData.time.trim(),
        room: formData.room.trim()
    };

    if (editingId) {
        onEdit(editingId, cleanData);
    } else {
        onAdd(cleanData);
    }

    setFormData({
        subject: '',
        day: '',
        time: '',
        room: ''
    });

    setEditingId(null);
    setShowForm(false);

    alert('Jadwal berhasil disimpan!');
    };


  const handleEdit = (schedule) => {
    setFormData({
      subject: schedule.subject,
      day: schedule.day,
      time: schedule.time,
      room: schedule.room
    });

    setEditingId(schedule.id);
    setShowForm(true);
  };

  return (
    <>
      <Navbar
        title="Schedule"
        subtitle="Atur jadwal perkuliahanmu"
      />

      <section className="content-section">
        <div className="section-header">
          <h3>Jadwal Kuliah</h3>

          <button
            className="btn-primary"
            onClick={() => {
              setFormData({
                subject: '',
                day: '',
                time: '',
                room: ''
              });
              setEditingId(null);
              setShowForm(true);
            }}
          >
            <Plus size={17} />
            Tambah Jadwal
          </button>
        </div>

        {showForm && (
          <form className="task-form" onSubmit={handleSubmit}>
            <div className="form-heading">
              <h3>{editingId ? 'Edit Jadwal' : 'Tambah Jadwal Baru'}</h3>

              <button
                type="button"
                className="close-button"
                onClick={() => setShowForm(false)}
              >
                <X size={19} />
              </button>
            </div>

            <label>Nama Mata Kuliah</label>
            <input
              type="text"
              placeholder="Masukkan nama mata kuliah"
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
              required
            />

            <label>Hari</label>
            <select
              value={formData.day}
              onChange={(e) =>
                setFormData({ ...formData, day: e.target.value })
              }
              required
            >
              <option value="">Pilih hari</option>
              <option value="Senin">Senin</option>
              <option value="Selasa">Selasa</option>
              <option value="Rabu">Rabu</option>
              <option value="Kamis">Kamis</option>
              <option value="Jumat">Jumat</option>
              <option value="Sabtu">Sabtu</option>
            </select>

            <label>Waktu</label>
            <input
              type="text"
              placeholder="Contoh: 08.00 - 10.00"
              value={formData.time}
              onChange={(e) =>
                setFormData({ ...formData, time: e.target.value })
              }
              required
            />

            <label>Ruangan</label>
            <input
              type="text"
              placeholder="Contoh: Ruang 203"
              value={formData.room}
              onChange={(e) =>
                setFormData({ ...formData, room: e.target.value })
              }
              required
            />

            <button type="submit" className="btn-primary">
              Simpan Jadwal
            </button>
          </form>
        )}

        {schedules.length > 0 ? (
          schedules.map(schedule => (
            <div className="schedule-row" key={schedule.id}>
              <div className="schedule-row-card">
                <ScheduleCard schedule={schedule} />
              </div>

              <div className="schedule-actions">
                <button
                  className="edit-button"
                  onClick={() => handleEdit(schedule)}
                  title="Edit jadwal"
                >
                  <Pencil size={16} />
                </button>

                <button
                  className="delete-button"
                  onClick={() => onDelete(schedule.id)}
                  title="Hapus jadwal"
                >
                  <Trash2 size={17} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="empty-message">Belum ada jadwal kuliah.</p>
        )}
      </section>
    </>
  );
}

export default Schedule;