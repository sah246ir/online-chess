 

# Online Chess

Online Chess is a real-time multiplayer chess game built with Node.js and React, utilizing a WebSocket server for handling real-time game communication. The frontend is developed with TypeScript and styled using Tailwind CSS. Currently, the backend uses in-memory storage with no database.

## Features

- Real-time multiplayer chess gameplay.
- Simple and intuitive user interface.
- Responsive design for seamless experience on various devices.
- In-memory storage for storing game data on the server.

## Technologies Used

- **Frontend**:
  - React
  - TypeScript
  - Tailwind CSS

- **Backend**:
  - Node.js
  - WebSocket (Socket.io for real-time communication)
  - JavaScript

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/online-chess.git
   ```

2. Navigate to the project directory:

   ```bash
   cd online-chess
   ```

3. Install dependencies for both frontend and backend:

   ```bash
   # Install frontend dependencies
   cd frontend
   npm install

   # Install backend dependencies
   cd ../backend
   npm install
   ```

## Usage

1. Start the backend server:

   ```bash
   # From the project root directory
   cd backend
   node dist/index.js
   ```

2. Start the frontend development server:

   ```bash
   # From the project root directory
   cd frontend
   npm start
   ```

3. Open your web browser and navigate to `http://localhost:3000` to access the application.

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.
 