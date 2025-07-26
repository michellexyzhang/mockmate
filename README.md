# MockMate

A web app that instantly generates LaTeX-formatted mock test PDFs from worksheets and tests.

## Features

- Upload PDF worksheets or tests
- Paste text content directly
- AI-powered question extraction and formatting
- LaTeX output generation
- PDF preview and download
- Responsive web interface

## Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React PDF** - PDF rendering
- **Monaco Editor** - Code editing

### Backend
- **FastAPI** - Python web framework
- **Google Gemini** - AI service for content processing
- **LaTeX** - Document formatting
- **Docker** - Containerization

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Python 3.8+
- Docker (optional)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/mockmate.git
cd mockmate
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Install backend dependencies:
```bash
cd ../backend
pip install -r requirements.txt
```

4. Set up environment variables:
```bash
# Backend - create .env file
GEMINI_API_KEY=your_gemini_api_key_here
```

### Development

1. Start the backend server:
```bash
cd backend
python main.py
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

#### Frontend
```bash
cd frontend
npm run build
npm start
```

#### Backend
```bash
cd backend
# Using Docker
docker build -t mockmate-backend .
docker run -p 8000:8000 mockmate-backend
```

## Project Structure

```
mockmate/
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/             # App Router pages
│   │   └── components/      # React components
│   ├── public/              # Static assets
│   └── package.json
├── backend/                 # FastAPI backend application
│   ├── api/
│   │   ├── controllers/     # API route handlers
│   │   ├── models/          # Data models
│   │   └── services/        # Business logic
│   ├── latex-service/       # LaTeX processing service
│   └── main.py             # FastAPI app entry point
└── README.md
```

## API Endpoints

- `POST /upload` - Upload PDF files
- `POST /extract-text` - Extract text from uploaded files
- `POST /generate-questions` - Generate questions from text
- `POST /generate-latex` - Convert questions to LaTeX
- `GET /download-pdf` - Download generated PDF

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Deployment

The application is deployed at:
- Frontend: [https://simplymockit.com](https://simplymockit.com)
- Backend: Configured for production deployment

## Support

For support, please open an issue on GitHub or contact the development team.
