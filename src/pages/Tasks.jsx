import { useState } from 'react';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';
import { Plus, Search, X } from 'lucide-react';

function Tasks({ tasks, onAdd, onToggle, onDelete, onEdit }) {
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    deadline: ''
  });

  const filteredTasks = tasks.filter(task =>
    `${task.title} ${task.subject}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );


    const handleSubmit = (e) => {
    e.preventDefault();

    if (
        !formData.title.trim() ||
        !formData.subject.trim() ||
        !formData.deadline
    ) {
        alert('Semua data tugas harus diisi!');
        return;
    }

    const cleanData = {
        title: formData.title.trim(),
        subject: formData.subject.trim(),
        deadline: formData.deadline
    };

    if (editingId) {
        onEdit(editingId, cleanData);
    } else {
        onAdd(cleanData);
    }

    setFormData({
        title: '',
        subject: '',
        deadline: ''
    });

    setEditingId(null);
    setShowForm(false);

    alert('Tugas berhasil disimpan!');
    };


  const handleEdit = (task) => {
    setFormData({
      title: task.title,
      subject: task.subject,
      deadline: task.deadline
    });

    setEditingId(task.id);
    setShowForm(true);
  };

  return (
    <>
      <Navbar
        title="My Tasks"
        subtitle="Kelola semua tugas kuliahmu di sini"
      />

      <section className="content-section">
        <div className="task-toolbar">
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Cari tugas atau mata kuliah..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button
            className="btn-primary"
            onClick={() => {
              setFormData({ title: '', subject: '', deadline: '' });
              setEditingId(null);
              setShowForm(true);
            }}
          >
            <Plus size={17} />
            Tambah Tugas
          </button>
        </div>

        {showForm && (
          <form className="task-form" onSubmit={handleSubmit}>
            <div className="form-heading">
              <h3>{editingId ? 'Edit Tugas' : 'Tambah Tugas Baru'}</h3>

              <button
                type="button"
                className="close-button"
                onClick={() => setShowForm(false)}
              >
                <X size={19} />
              </button>
            </div>

            <label>Nama Tugas</label>
            <input
              type="text"
              placeholder="Masukkan nama tugas"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />

            <label>Mata Kuliah</label>
            <input
              type="text"
              placeholder="Masukkan mata kuliah"
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
              required
            />

            <label>Deadline</label>
            <input
              type="date"
              value={formData.deadline}
              onChange={(e) =>
                setFormData({ ...formData, deadline: e.target.value })
              }
              required
            />

            <button type="submit" className="btn-primary">
              Simpan Tugas
            </button>
          </form>
        )}

        <div className="section-header task-list-heading">
          <h3>Daftar Tugas ({filteredTasks.length})</h3>
        </div>

        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <div className="task-row" key={task.id}>
              <TaskCard
                task={task}
                onToggle={onToggle}
                onDelete={onDelete}
              />

              <button
                className="edit-button"
                onClick={() => handleEdit(task)}
              >
                Edit
              </button>
            </div>
          ))
        ) : (
          <p className="empty-message">Tugas tidak ditemukan.</p>
        )}
      </section>
    </>
  );
}

export default Tasks;