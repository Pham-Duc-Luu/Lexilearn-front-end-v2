# Lexilearn Frontend Documentation (English Version)

## Introduction

Before diving into this documentation, it's highly recommended that you have a solid understanding of [React](https://react.dev/) since the frontend of this application is built entirely using React. Familiarity with [React Router](https://reactrouter.com/) and [Redux Toolkit](https://redux-toolkit.js.org/) is also essential.

## Requirements

- **Node.js version 18.0 or higher** (check with `node -v`).
- You may use **nvm** to manage multiple Node.js versions on your machine.

## 🚀 Project Setup

First, make sure Git is installed. Then clone the frontend source code with:

```bash
git clone https://github.com/Pham-Duc-Luu/Lexilearn-front-end-v2.git
```

Navigate to the project directory:

```bash
cd ./Lexilearn-front-end-v2
```

Install all project dependencies:

```bash
npm install --force
```

### Project Structure

```
📦 Lexilearn-front-end-v2
├── 📄 .env                     # Environment variables
├── 📄 index.html              # Main HTML file (Vite)
├── 📁 node_modules/           # Installed libraries
├── 📄 package.json            # Metadata and scripts
├── 📄 package-lock.json       # Dependency lock file
├── 📄 postcss.config.js       # PostCSS config
├── 📁 public/                 # Static assets (favicon, images...)
├── 📄 README.md               # Project documentation
├── 📁 src/                    # Source code (React + TypeScript)
│   ├── 📁 components/         # Reusable components
│   ├── 📁 pages/              # Main pages
│   ├── 📁 store/              # State management (Redux)
│   ├── 📁 assets/             # Images, audio, fonts...
│   └── 📄 main.tsx            # React entry point
├── 📄 tailwind.config.js      # Tailwind CSS config
├── 📄 tsconfig.json           # Global TypeScript config
├── 📄 tsconfig.app.json       # TypeScript config for app
├── 📄 tsconfig.node.json      # TypeScript config for Node
├── 📄 vite.config.ts          # Vite configuration
├── 📄 eslint.config.js        # ESLint configuration
```

## UI Libraries

- **[NextUI](https://nextui.org/):** Modern, customizable React UI library with built-in dark mode.
- **[shadcn/ui](https://ui.shadcn.com/):** Tailwind-based UI components using Radix UI.
- **[Framer Motion](https://www.framer.com/motion/):** Advanced animation library for React.

## State Management

- The project uses **[Redux Toolkit](https://redux-toolkit.js.org/)** for global state management.
- Features include easy store setup, async logic via `createAsyncThunk`, and maintainable architecture.

> 💡 For debugging, install the **Redux DevTools Extension**:
> [Redux DevTools for Chrome](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)

---

## How Lexilearn Frontend Works 🚀

Lexilearn is a flashcard-based learning platform built with **React** and **Vite**. It uses **React Router** for routing, **Redux** for state management, and multiple providers to configure global settings.

### Overview

Key frontend concepts:

- **Routing** with **React Router**
- **State Management** with **Redux Toolkit**
- **API Integration** with defined services
- **Global Providers** including Redux, Apollo, Google OAuth, and UI context

Features include login/register, flashcard management, study and editing decks—all with a clean and responsive UI.

### App Entry Point: `index.html`

Basic HTML file to bootstrap React:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link href="/src/assets/icon.svg" rel="icon" type="image/svg+xml" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <title>Lexilearn</title>
  </head>
  <body>
    <div id="root"></div>
    <script src="/src/main.tsx" type="module"></script>
  </body>
</html>
```

### Routing Structure (React Router)

Routes are defined in `src/main.tsx`. Key route structure:

- `/auth`: Login/Register page
- `/home`: Main app

  - `/library/:status/:page`: Flashcard library by status
  - `/desk/:deskId`: Desk details
  - `/profile`: User profile

- `/edit-desk/:deskId`: Edit vocabulary deck
- `/review/desk/flashcard`: Review flashcards
- `/components/*`: UI component playground

All are wrapped inside `MainLayout`.

### Main Layout

Defined in `src/layout.tsx`. Wraps all app routes and includes providers and settings UI.

```tsx
export default function MainLayout() {
  return (
    <Providers>
      <div className="relative">
        <Outlet />
        <SettingBox />
      </div>
    </Providers>
  );
}
```

### Global Providers

Defined in `src/Providers.tsx`. This sets up all necessary providers:

- **HelmetProvider**: Manage `<head>` tags (SEO)
- **HeroUIProvider**: Base UI setup
- **ToastContainer**: Notifications
- **Redux Provider + PersistGate**: Redux state and persistence
- **MouseContextProvider**: Mouse-related context
- **GoogleOAuthProvider**: Google login support
- **AuthProvider**: User authentication
- **ApolloProvider**: GraphQL client setup using Redux token

---

### Redux Store Setup

The Redux store is configured using `@reduxjs/toolkit` with persistence support via `redux-persist`. Features include:

- Async logic (e.g., login, fetch decks)
- Modular slice files (Auth, Desk, Cards, Review\...)
- Integrated GraphQL and REST APIs

See source at: `src/redux/store/ProtoStore.slice.ts`

---

For further technical breakdowns or contributions, refer to the project source code.

> For feedback or questions, contact the maintainer or create an issue on GitHub.
