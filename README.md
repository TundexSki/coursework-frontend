# After-School Lessons Frontend

Vue 3 + Vite frontend for the CST3144 After-School Lessons coursework project.

## Links

- **Live App**: https://TundexSki.github.io/coursework-frontend/
- **Backend API**: https://tundeh-backend.onrender.com
- **Backend Repo**: https://github.com/TundexSki/express-coursework

## Features

- Browse after-school lessons with search and sorting
- Add lessons to cart with space availability tracking
- Checkout with name/phone validation
- Responsive design for mobile and desktop

## Tech Stack

- **Vue 3** with Composition API
- **Vue Router** for navigation
- **Vite** for build tooling
- **Fetch API** for backend communication

## Project Setup

```sh
npm install
```

### Development

```sh
npm run dev
```

### Production Build

```sh
npm run build
```

### Deploy to GitHub Pages

```sh
npm run build
# Push the dist folder to gh-pages branch
```

## API Endpoints Used

- `GET /lessons` - Fetch all lessons
- `GET /search?q=` - Search lessons
- `POST /orders` - Create order
- `PUT /lessons/:id` - Update lesson spaces
