import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import axios from 'axios';

export default function AddNote({ open, handleClose, refresh }) {
  const [note, setNote] = useState({ title:'', content:'' });
  const handleChange = e => setNote({...note, [e.target.name]: e.target.value});

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post('https://localhost:7213/api/notes', note);
    setNote({ title:'', content:'' });
    refresh();
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Note</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField label="Title" fullWidth name="title" value={note.title} onChange={handleChange} sx={{mb:2}} />
          <TextField label="Content" fullWidth multiline minRows={3} name="content" value={note.content} onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained">Add</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
