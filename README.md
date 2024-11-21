# Electron, Vite, React, TypeScript Quickstart

a quickstart template for creating applications using Electron, Vite, React, and TypeScript

## Project Structure

```
.gitignore
electron-builder.json
eslint.config.js
index.html
package.json
README.md
src/
    electron/
        main.ts
        tsconfig.json
        util.ts
    ui/
        App.css
        App.tsx
        assets/
        index.css
        main.tsx
        vite-env.d.ts
tsconfig.app.json
tsconfig.json
tsconfig.node.json
vite.config.ts
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/SnakeTuan/electron-react-typescript-quick-start.git
    cd electron-vite-react-ts-quickstart
    ```

2. Install the dependencies:

    ```sh
    npm i
    ```

### Start the project

#### Development Mode

To run the app in development mode with hot module replacement:

```sh
npm run dev
```

This will start both the Vite development server and the Electron app. So you can see the changes while coding, you don't have to rebuild the app

### Building the App

To build the app for distribution:

```sh
npm run dist:mac   # For macOS
npm run dist:win   # For Windows
npm run dist:linux # For Linux
```

This will create the distribution packages in the `dist` directory