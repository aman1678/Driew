# Driew

Driew is a web app for sharing and browsing reviews and discussion posts about Pakistani dramas. Visitors can browse posts, add a post for a drama, and edit or delete posts.

## Features

- Browse posts and their drama, description, and date.
- Create, edit, and delete posts.
- Browse posts for a specific drama through the backend API.
- Store posts in a local SQLite database.

## Tech stack

- **Frontend:** React, TypeScript, and Vite
- **Backend:** Python and Flask
- **Database:** SQLite with Flask-SQLAlchemy

## Run locally

You will need Python, Node.js, and npm installed. Start the backend and frontend in separate terminals.

### Backend

```powershell
cd backend
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt Flask-SQLAlchemy Flask-Cors
python main.py
```

The Flask server starts at `http://127.0.0.1:5000`. It creates the SQLite database and tables on startup.

### Frontend

```powershell
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite in your browser. The frontend calls the backend at `http://127.0.0.1:5000`.

## API

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/posts/all` | List all posts |
| `GET` | `/api/posts/<drama>` | List posts for a drama |
| `POST` | `/api/posts` | Create a post with `drama` and `description` fields |
| `PATCH` | `/api/posts/<post_id>` | Update a post's description |
| `DELETE` | `/api/delete/<post_id>` | Delete a post |

## Project layout

```text
backend/   Flask API, database configuration, and post model
frontend/  React and TypeScript application
```

Disclaimer: Copilot was utilized to assist in writting documentation. 