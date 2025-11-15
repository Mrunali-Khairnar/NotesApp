# NotesApp

This is a full-stack Notes app project.

**Backend:** ASP.NET Core Web API (C#)
**Frontend:** ReactJS

## Features

- Create, Read, Update, Delete notes
- Uses SQL Server and Entity Framework Core migrations
- Bootstrap UI for clean design

## How to Run

### Backend

1. Open `NotesApi` in Visual Studio.
2. Open "Package Manager Console" and run:
Update-Database

text
3. Press **F5** to start the API.

### Frontend

1. Open `notes-frontend` in VS Code.
2. Run:
npm install
npm start

text
3. The frontend opens on `http://localhost:3000` and talks to your API.

Edit your API URLs in React (`App.js`) if your API runs on a different port.

---