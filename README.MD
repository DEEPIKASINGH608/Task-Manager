Project Documentation: TaskSync

Project Overview
Goal: A full-stack MERN (MongoDB, Express, React, Node) application for managing tasks.

Objective: Built for the Global Trend Full Stack Development Internship Assessment.

Core Functionality: Full CRUD (Create, Read, and Delete) operations with real-time cloud database persistence.

Frontend Features
Framework: Developed using React with Vite for fast performance.

Styling: Styled with Tailwind CSS for a modern, clean UI.

Responsiveness: Fully responsive layout designed to work on desktops, tablets, and mobile devices.

UX Highlights: Interactive status badges (Pending/Completed) and a hover-activated delete feature.


Backend & Database
Server: Built with Node.js and Express.js.

Database: Hosted on MongoDB Atlas (Cloud) for persistent storage.

API Architecture: RESTful API endpoints for handling task data securely.

Security: Environment variable management using dotenv to protect database credentials.


Setup Instructions
Prerequisites: Ensure you have Node.js and npm installed on your system.

Step 1: Clone the repository to your local machine.

Step 2: Navigate to the /backend folder and run npm install.

Step 3: Create a .env file in the /backend directory and add your MONGO_URI.

Step 4: Run npm run dev in the backend terminal to connect to the database.

Step 5: Navigate to the /frontend folder, run npm install, and then npm run dev.

Step 6: Open http://localhost:5173 in your browser to interact with the app.