# Loogan BookViewer

A modern web application for reading and managing books, built with Next.js, Shadcn UI, and Express.

## Features

- 📚 Book reading interface with advanced navigation
- 📖 Table of Contents support
- 👥 Student and Instructor portals
- 🎨 Modern UI with Shadcn UI components
- 🔒 Secure authentication
- 📱 Responsive design

## Tech Stack

### Frontend

- Next.js
- Shadcn UI
- TypeScript
- Tailwind CSS

### Backend

- Express.js
- MongoDB
- Node.js

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Python (v3.8 or higher)
- MongoDB

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/Loogan-BookViewer.git
cd Loogan-BookViewer
```

2. Install frontend dependencies:

```bash
cd frontend
npm install
```

3. Install backend dependencies:

```bash
cd ../backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

4. Set up environment variables:

   - Create `.env` files in both frontend and backend directories
   - Add necessary environment variables (see `.env.example` files)

5. Start the development servers:

Frontend:

```bash
cd frontend
npm run dev
```

Backend:

```bash
cd backend
npm run dev
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Project Structure

```
loogan-bookviewer/
├── backend/
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   └── server.js        # Express server setup
├── frontend/
│   ├── src/
│   │   ├── app/         # Next.js app directory
│   │   ├── components/  # React components
│   │   │   └── ui/      # shadcn/ui components
│   │   └── lib/         # Utility functions
│   └── public/          # Static assets
└── README.md
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Books

- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get specific book
- `POST /api/books` - Create new book (protected)
- `PUT /api/books/:id/highlight` - Add highlight (protected)
- `DELETE /api/books/:id/highlight/:highlight_id` - Remove highlight (protected)

### Notes

- `GET /api/notes` - Get user's notes (protected)
- `POST /api/notes` - Create new note (protected)
- `PUT /api/notes/:id` - Update note (protected)
- `DELETE /api/notes/:id` - Delete note (protected)

## Acknowledgments

- Designed for modern educational institutions
- Built with modern web technologies for optimal performance
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
