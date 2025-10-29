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
books-lists/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── AuthorCard.tsx    # Displays author information
│   │   ├── BookCard.tsx      # Displays book information
│   │   └── SearchBar.tsx     # Search input component
│   ├── mockData/             # Static data for development
│   │   └── staticData.ts     # Books and authors mock data
│   ├── services/             # API service layers (to be implemented)
│   ├── types/                # TypeScript type definitions (to be implemented)
│   ├── App.tsx               # Main application component
│   ├── main.tsx              # Application entry point
│   └── index.css             # Global styles with Tailwind
├── public/                   # Static assets
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── vite.config.js            # Vite build configuration
└── README.md                 # This file
```

## Current Features

### Phase 1: Static UI (Complete)

- ✅ Component-based architecture
- ✅ Tab navigation between Books and Authors views
- ✅ Search functionality across books and authors
- ✅ Responsive design with Tailwind CSS
- ✅ Static mock data for development

### Phase 2: API Integration (In Progress)

- ✅ Service layer for C# backend authors & books endpoints
- ✅ Google Books API suggestions in the add-book form
- ✅ Loading and error states for network requests
- ✅ Custom hooks for consuming backend services
- ⏳ Extract reusable loading/error components for consistency
- ⏳ Document environment variables for local/hosted deployments

### Phase 3: Advanced Features (Future)

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

### Backend (Student Project)

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

1. Fork the repository and clone it to your local machine.
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open the application in your browser at `http://localhost:5173`

## Backend Development (C# Team)

## Frontend Development (React Team)

### Component Structure

- Proper component separation and organization
- TypeScript interfaces for all props
- Reusable components with clear responsibilities
- Responsive design with Tailwind CSS

### State Management

- Create React Context for global state
- Implement custom hooks for data fetching
- Proper state updates and side effects

### API Integration

- Service layer for C# backend API (authors, books, ISBN import)
- Google Books API for enriched data and form autofill
- Loading states, retry flows, and error handling
- Proper async/await patterns with custom hooks

### User Interface

- Clean, intuitive design
- Responsive layout (mobile and desktop)
- Smooth transitions and interactions
- Accessibility considerations

## API Endpoints Documentation

```
C# Backend (To Be Implemented by Students)
```

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

### For questions or issues:

- Check the documentation first
- Review error messages carefully
- Ask your instructor or teaching assistant
- Collaborate with your team members

Good luck with your project!
**Remember:** learning to debug and problem-solve is just as important as writing code.
