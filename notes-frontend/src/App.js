import React from 'react';
import NotesGrid from './components/NotesGrid';

function App() {
  return (
    <div>
      <header style={{textAlign:"center", padding:"22px 0", background:"#283593", color:"#fff", fontWeight:700, fontSize:"2rem", letterSpacing:2}}>
        NotesBuddy
      </header>
      <NotesGrid />
    </div>
  );
}

export default App;
