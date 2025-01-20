# 📌 Kanban Board App

This project is a Kanban Board application where users can organize their tasks across different boards. Each board consists of columns ('todo', 'inprogress', 'done') and allows users to add, edit, and delete tasks as they progress through their workflow.

## ✨ Features

- **Multiple Boards**: Each user can create and manage multiple boards.
- **Task Organization**: Each board has three columns:
  - **Todo**: Tasks that need to be started.
  - **In Progress**: Tasks currently in progress.
  - **Done**: Completed tasks.
- **Task Details**: Tasks have attributes such as:
  - **Title**
  - **Description**
  - **Priority** (high, medium, low)
  - **Due Date**
- **Filtering Options**: Sort boards by date or alphabetically.
- **Authentication**: Clerk Authentication for secure user login and management.
- **State Management**: Zustand is used to handle app state.
- **Drag & Drop (DnD)**: Allows tasks to be moved across columns.

## 🚀 Getting Started

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/kanban-board-app.git
   cd kanban-board-app
   pnpm install
   ```

## 🛠️ Tech Stack

- **Frontend**: React, Tailwind CSS
- **UI Components**: HeadlessUI for accessible, unstyled components
- **Icons**: Heroicons, React-icons
- **State Management**: Zustand
- **Drag & Drop**: DnD Context (or an alternative library for drag-and-drop functionality)
- **Authentication**: Clerk Authentication
- **Data Fetching**: React Query with Axios
- **Utilities**: Day.js, clsx
- **Dev Tools**: Vite, ESLint, Prettier

## 📂 Project Structure

- `src/atom`: Contains small, reusable UI components.
- `src/components`: Contains larger, reusable UI components.
- `src/hooks`: Custom hooks for reusable logic.
- `src/routes`: Defines routes for different pages in the application.
- `src/services`: Services for handling API requests and data fetching.
- `src/store`: Zustand configuration for state management.
- `src/utils`: Helper functions and utility files.

## 📑 Available Scripts

- **`npm run dev`**: Start the development server.
- **`npm run build`**: Build the app for production.
- **`npm run lint`**: Run linting checks.

## 🌟 Future Enhancements

- **Email Notifications**: Send reminders for tasks nearing their due dates (using `react-email`).
- **Toasts**: Show success/error messages when creating, updating, or deleting tasks/boards (using `react-hot-toast`).
