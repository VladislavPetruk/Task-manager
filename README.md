# Custom Starter Template

🚧 **This repository is currently under development.** Some features may still be incomplete or unstable. Feel free to explore, but note that changes are ongoing.

This is a Next.js starter template configured with modern tools and technologies to kickstart your web application development. It includes powerful libraries for state management, UI components, testing, and more.

## Table of Contents

- [Technologies](#technologies)
- [Installation](#installation)
- [Folder Structure](#folder-structure)
- [Removing Unnecessary Packages](#removing-unnecessary-packages)

## Technologies

This project uses the following technologies:

- **[Next.js](https://nextjs.org/)**: React framework for building fast and scalable web applications.
- **[TypeScript](https://www.typescriptlang.org/)**: Typed superset of JavaScript for catching errors during development.
- **[TailwindCSS](https://tailwindcss.com/)**: Utility-first CSS framework for designing responsive user interfaces.
- **[Shadcn/UI](https://shadcn.dev/docs)**: A set of customizable components built with Radix UI and Tailwind CSS.
- **[React Query](https://tanstack.com/query/latest)**: Powerful data-fetching library for managing server state in React.
- **[Zustand](https://zustand-demo.pmnd.rs/)**: Small and fast state management library for React.
- **[Jest](https://jestjs.io/)**: Testing framework to ensure reliability and correctness of the code.
- **[Prettier](https://prettier.io/)**: Code formatter to ensure consistent style across the codebase.
- **[ESLint](https://eslint.org/)**: Linter for identifying and fixing problems in the code.
- **[Husky](https://typicode.github.io/husky/)**: Git hooks to automate linting, formatting, and other tasks on commits and pushes.


## Installation

Before you begin, make sure you have Node.js (>= 16.8) and npm or yarn installed.

To install the project dependencies, run the following command:

```bash
npm install
# or
yarn install
```

## Folder Structure

```bash
├── app/                 # Next.js app directory
├── components/          # Reusable UI components
├── hooks/               # Custom hooks for state management and logic
├── lib/                 # Library functions and utilities
├── stores/              # Zustand stores for global state management
├── types/               # Type definitions
├── utils/               # Utility functions
```

## Removing Unnecessary Packages

If you find that certain dependencies in the package.json file are not needed for your project, you can safely remove them. Here’s how:

- Open the package.json file in the root of the project.
- Locate the package you want to remove under the "dependencies" or "devDependencies" section.
- Delete the package entry.
- Run the following command to update the node_modules folder:


```bash
npm uninstall <package-name>
# or
yarn remove <package-name>
```