# Books & Authors Library - React + TypeScript Project

## Project Overview

This is a full-stack project that demonstrates the integration of a React TypeScript frontend with a C# backend API. The application allows users to browse books and authors, with additional data enrichment from the Google Books API.

## Objectives

- Building a React application with TypeScript
- Component-based architecture and prop management
- State management with React hooks
- API integration patterns
- Styling with Tailwind CSS
- Full-stack development workflow

## Project Structure

```
library-app/
├── src/
│   ├── components/           # Presentation components and shared states
│   │   ├── AuthorCard.tsx
│   │   ├── BookCard.tsx
│   │   ├── LoadingState.tsx
│   │   └── ErrorState.tsx
│   ├── components/tabs/      # Forms rendered in tab views
│   │   ├── AddAuthorForm.tsx
│   │   └── AddBookForm.tsx
│   ├── hooks/                # Custom hooks wrapping API services
│   │   ├── useAuthors.ts
│   │   └── useBooks.ts
│   ├── mockData/             # Legacy mock data kept for reference
│   ├── service/              # API service abstractions
│   │   ├── authorService.ts
│   │   ├── booksService.ts
│   │   └── googleBooksService.ts
│   ├── types/                # TypeScript contracts shared by UI & services
│   │   ├── Authors.ts
│   │   └── Book.ts
│   ├── App.tsx               # Main application component
│   ├── main.tsx              # Vite entry point
│   └── index.css             # Tailwind base styles
├── public/                   # Static assets
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite build configuration
└── README.md                 # This file
```

## Current Features

### Phase 1: Static UI

- ✅ Component-based architecture
- ✅ Tab navigation between Books and Authors views
- ✅ Search functionality across books and authors
- ✅ Responsive design with Tailwind CSS
- ✅ Static mock data for development

### Phase 2: API Integration
- ✅ Service layer for C# backend authors & books endpoints
- ✅ Google Books API suggestions in the add-book form
- ✅ Loading and error states for network requests
- ✅ Custom hooks for consuming backend services
- ✅ Shared loading/error components for consistent UX
- ✅ Documented environment variables for local/hosted deployments

### Phase 3: Advanced Features

- Add book details page
- Implement filtering and sorting
- Add favorites/bookmarks functionality
- User authentication (if required)

## Technology Stack

### Frontend

- React 18 - UI library
- TypeScript - Type safety and better developer experience
- Vite - Fast build tool and dev server
- Tailwind CSS - Utility-first CSS framework
- Lucide React - Icon library

### Backend 

- C# / ASP.NET Core - RESTful API
- Entity Framework - Database ORM
- SQL Server / PostgreSQL - Database

### External APIs

**Google Books API** - Book covers, reviews, and metadata

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- Code editor (VS Code recommended)

### Installation

1. Clone the repository to your local machine.
2. Install dependencies: `npm install`
3. Configure environment variables (see below).
4. Start the development server: `npm run dev`
5. Open the application in your browser at `http://localhost:5173`

### Configuration

Create a `.env.local` file in the project root with the following values:

```
VITE_API_BASE_URL=https://libraryapp-api-danango-hnuhu9c4buboma9.azurewebsites.net
VITE_GOOGLE_BOOKS_API_KEY=your_optional_google_books_key
```

- `VITE_API_BASE_URL` should point to the live ASP.NET Core API. Replace the sample URL if you are running your own backend instance locally or on another host.
- `VITE_GOOGLE_BOOKS_API_KEY` is optional. Leaving it empty still allows unauthenticated requests, but adding a key increases quota.

#### Data Flow

1. On load, the frontend fetches authors (`GET /authors`) and books (`GET /books`) from the configured API.
2. Adding an author submits a `POST /authors` request.
3. Adding a book submits `POST /books`, then the app automatically calls `POST /books/import/isbn/{isbn}` to enrich the record with metadata the backend can source.
4. While typing a title, the Google Books API provides suggestions that can prefill the form.
5. Note: The hosted API runs on Azure’s free tier, so it can take 15–30 seconds to wake up after a period of inactivity. If requests fail at first, wait a moment and retry.

## Development Notes

- Components are written in TypeScript with Tailwind utility classes for styling.
- Data access is centralized in `src/service` and consumed via the custom hooks in `src/hooks`.
- Loading and error UI states are handled by shared components to keep screens consistent.
- Google Books title suggestions run client-side; backend metadata enrichment happens through the Azure API.

## API Endpoints Documentation

### Books Endpoints

```
GET    /books           - Get all books
GET    /books/{id}      - Get book by ID
POST   /books           - Create new book
PUT    /books/{id}      - Update book
DELETE /books/{id}      - Delete book
```

### Authors Endpoints

```
GET    /authors         - Get all authors
GET    /authors/{id}    - Get author by ID
POST   /authors         - Create new author
PUT    /authors/{id}    - Update author
DELETE /authors/{id}    - Delete author
```

## Google Books API Integration

Base URL: `https://www.googleapis.com/books/v1`

### Key Endpoint:

```bash
GET /volumes?q=isbn:{ISBN}
```

#### Use this to fetch additional book data like:

- High-resolution cover images
- Average ratings and review counts
- Publisher information
- Page counts

## Common Issues & Solutions

### CORS Errors

- Ensure that your backend server is configured to allow cross-origin requests (CORS).
- Check the CORS settings in your backend server's configuration.
- If needed, add appropriate CORS headers to your API responses.

### TypeScript Errors

- Ensure that your TypeScript configuration is set up correctly.
- Make sure to have TypeScript installed and configured in your development environment.
- Check your TypeScript configuration file for any errors or warnings.

### API Rate Limits

- Google Books API has rate limits and quotas.
- Ensure that your API requests are within the rate limits to avoid being blocked.
- Check the rate limits and quotas documentation for the Google Books API.

## Support

If you run into issues:

- Verify your environment variables are correct and the backend URL is reachable.
- Check the browser console for CORS or network errors.
- Review the API responses using a tool like `curl` or Postman to confirm the backend is healthy.
- Feel free to open an issue if you discover a bug or have a feature request.
