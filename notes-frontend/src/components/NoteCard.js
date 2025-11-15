import React from 'react';
import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function NoteCard({ note, color, onEdit, onDelete }) {
  return (
    <Card sx={{ bgcolor: color, borderRadius: 3, minHeight: 120, boxShadow: 6, display: "flex", flexDirection: "column", height: "100%" }}>
      <CardContent sx={{ flexGrow: 1, pb: "8px!important" }}>
        <Typography variant="h6" fontWeight={700}>{note.title}</Typography>
        <Typography variant="body2" sx={{ whiteSpace: "pre-line", mb: 2 }}>
          {note.content}
        </Typography>
      </CardContent>
      <Box sx={{ display: "flex", justifyContent: "flex-end", pb: 1, pr: 1 }}>
        <IconButton onClick={onEdit}><EditIcon color="primary" /></IconButton>
        <IconButton onClick={onDelete}><DeleteIcon color="error" /></IconButton>
      </Box>
    </Card>
  );
}
