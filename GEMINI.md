# Gemini Project Analysis: my-quest-frontend

## Project Overview

This project is a modern frontend application built with React and TypeScript. It appears to be the user interface for a social or content-sharing platform, allowing users to view posts, comments, and stories.

The application is a Single-Page Application (SPA) and utilizes a modern toolchain for development and building.

**Key Technologies:**

*   **Framework:** React
*   **Language:** TypeScript
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS with `shadcn/ui` components and Lucide icons.
*   **Routing:** React Router
*   **Data Fetching & State Management:** React Query
*   **Forms:** React Hook Form and Zod for validation.

**Architecture:**

The project follows a component-based architecture. The code is organized into features (auth, posts, comments) with a clear separation of concerns. It uses React Query for managing server state, which simplifies data fetching, caching, and synchronization.

## Building and Running

The following commands are available in `package.json` to build and run the project:

*   **Install dependencies:**
    ```bash
    npm install
    ```

*   **Run the development server:**
    ```bash
    npm run dev
    ```

*   **Build for production:**
    ```bash
    npm run build
    ```

*   **Lint the code:**
    ```bash
    npm run lint
    ```

*   **Preview the production build:**
    ```bash
    npm run preview
    ```

## Development Conventions

*   **TypeScript:** The entire codebase is written in TypeScript, enforcing type safety.
*   **Component-Based:** The application is built with reusable React components, organized by feature.
*   **Styling:** Styling is done using Tailwind CSS, and the `shadcn/ui` component library is used for UI elements.
*   **Path Aliases:** The project uses path aliases (e.g., `@/components/...`) for cleaner and more maintainable imports. These are configured in `tsconfig.json` and `vite.config.ts`.
*   **Linting:** ESLint is configured to maintain code quality and consistency.
*   **State Management:** React Query is the preferred way to manage server state.
*   **Forms:** Use React Hook Form for building forms and Zod for schema validation.
