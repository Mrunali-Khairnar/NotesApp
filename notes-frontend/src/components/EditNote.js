import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import axios from 'axios';

export default function EditNote({ open, handleClose, noteId, refresh }) {
  const [note, setNote] = useState({ title: '', content: '' });

  useEffect(() => {
    if (noteId && open) {
      axios.get(`https://localhost:7213/api/notes/${noteId}`)
        .then(res => setNote(res.data))
        .catch(err => console.error(err));
    }
  }, [noteId, open]);

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`https://localhost:7213/api/notes/${noteId}`, note);
    refresh();
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Note</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Title"
            type="text"
            fullWidth
            value={note.title}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            name="content"
            label="Content"
            type="text"
            multiline
            rows={4}
            fullWidth
            value={note.content}
            onChange={handleChange}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained">Save</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
