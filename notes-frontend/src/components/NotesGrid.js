import React, { useEffect, useState } from 'react';
import { Grid, Fab, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import NoteCard from './NoteCard';
import AddNote from './AddNote';
import EditNote from './EditNote';
import ConfirmDialog from './ConfirmDialog';

const COLORS = ['#fbbc04', '#ffd6e0', '#d0f4de', '#f9c6c9', '#81ecec', '#ffeaa7', '#fab1a0'];

export default function NotesGrid() {
  const [notes, setNotes] = useState([]);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [currentNoteId, setCurrentNoteId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const fetchNotes = async () => {
    const res = await axios.get('https://localhost:7213/api/notes');
    setNotes(res.data);
  };

  useEffect(() => { fetchNotes(); }, []);

  const handleDelete = async () => {
    await axios.delete(`https://localhost:7213/api/notes/${deleteId}`);
    setConfirmOpen(false);
    fetchNotes();
  };

  const openEditDialog = (id) => {
    setCurrentNoteId(id);
    setEditOpen(true);
  };

  return (
    <Box sx={{ p: 3, bgcolor: "#f6f8fc", minHeight: "100vh" }}>
      <Grid container spacing={3}>
        {notes.map((note, i) => (
          <Grid key={note.id} item xs={12} sm={6} md={4} lg={3}>
            <NoteCard
              note={note}
              color={COLORS[i % COLORS.length]}
              onEdit={() => openEditDialog(note.id)}
              onDelete={() => {
                setDeleteId(note.id);
                setConfirmOpen(true);
              }}
            />
          </Grid>
        ))}
      </Grid>
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", bottom: 32, right: 32 }}
        onClick={() => setAddOpen(true)}
      >
        <AddIcon />
      </Fab>

      <AddNote open={addOpen} handleClose={() => setAddOpen(false)} refresh={fetchNotes} />
      <EditNote
        open={editOpen}
        noteId={currentNoteId}
        handleClose={() => setEditOpen(false)}
        refresh={fetchNotes}
      />
      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
      />
    </Box>
  );
}
