## Introduction

This project is a web application that fetches and stores cryptocurrency data from the CoinGecko API and displays it in a user-friendly interface. The backend is built using Node.js, Express, and MongoDB, while the frontend is built using React and Redux.

## Features

- Fetches real-time cryptocurrency data
- Stores data in MongoDB
- Provides an API to access stored data
- Displays data in a user-friendly interface

## Technologies

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- dotenv
- axios

### Frontend

- React
- Redux
- Redux Toolkit
- axios
- dotenv

## Setup

### Backend Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/rameshchoyal/Backend-Assignment.git
   cd your-repo/backend
2. Install dependencies:

   ```bash
   npm install
3. Create a .env file in the root directory and add the following:

   ```bash
   MONGODB_URI=mongodb+srv://ramesh1451:Ramesh1451@cluster0.php9gx6.mongodb.net/
   PORT=3000
   API_BASE_URL=https://api.coingecko.com/api/v3
   
4. Run the backend server:

   ```bash
   npm run dev

### Frontend Setup

1. **Navigate to the frontend directory:

    ```bash
    cd ../frontend
    
2. Install dependencies:

   ```bash
   npm install

3. Create a .env file in the root directory and add the following:

   ```bash
   REACT_APP_API_BASE_URL=http://localhost:3000

4. Run the frontend application:

  ```bash
  npm start

   
