# Rick and Morty Character Explorer

This application allows users to browse characters from the Rick and Morty series, with features for filtering, sorting, and language switching.

## Features

- Display Rick and Morty characters with their details (Name, Status, Species, Gender, Origin)
- Filter characters by Status and Species
- Sort characters by Name and Origin
- Pagination to load more characters
- Language switching between English and German
- Responsive design for all device sizes

## Tech Stack

- React + Vite
- Apollo Client for GraphQL queries
- i18next for internationalization
- CSS for styling

## Setup Instructions

1. Clone the repository:

```bash
git clone <repository-url>
cd rick-morty-app
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to:

```
http://localhost:5173
```

## Build for Production

To build the app for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Bonus Feature

- The application implements pagination with "Load More" functionality that loads additional characters as the user scrolls, providing a seamless browsing experience.

## Author

[Marija Koteska]
