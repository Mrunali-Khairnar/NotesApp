import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const res = await axios.get("https://localhost:7213/api/notes");
    setNotes(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId === null) {
      await axios.post("https://localhost:7213/api/notes", form);
    } else {
      await axios.put(`https://localhost:7213/api/notes/${editingId}`, { ...form, id: editingId });
    }
    setForm({ title: "", content: "" });
    setEditingId(null);
    fetchNotes();
  };

  const handleEdit = (note) => {
    setForm({ title: note.title, content: note.content });
    setEditingId(note.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`https://localhost:7213/api/notes/${id}`);
    fetchNotes();
  };

  const handleCancel = () => {
    setForm({ title: "", content: "" });
    setEditingId(null);
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="mb-4 text-center">Notes App</h2>
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="form-group mb-3">
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="form-control"
                placeholder="Title"
                required
              />
            </div>
            <div className="form-group mb-3">
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                className="form-control"
                placeholder="Content"
                rows="3"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary me-2">
              {editingId === null ? "Add Note" : "Update Note"}
            </button>
            {editingId !== null && (
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
            )}
          </form>
          <div className="list-group">
            {notes.map((note) => (
              <div key={note.id} className="list-group-item mb-2">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5>{note.title}</h5>
                    <p className="mb-1">{note.content}</p>
                  </div>
                  <div>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(note)}>
                      Edit
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(note.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {notes.length === 0 && (
              <div className="text-center text-muted">No notes found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
