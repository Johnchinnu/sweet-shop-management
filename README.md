# sweet-shop-management
This is a full-stack MERN (MongoDB, Express, React, Node.js) application built as a technical assessment. It's a comprehensive Sweet Shop Management System that allows users to register, log in, view sweets, and manage inventory based on their role (user or admin).

---

## Screenshots
<img width="1700" height="887" alt="image" src="https://github.com/user-attachments/assets/cc91718c-c1eb-4793-ba17-d2021c04fd6d" />

<img width="1384" height="908" alt="image" src="https://github.com/user-attachments/assets/44b48182-b935-43d6-bdb6-164a417da421" />

<img width="1611" height="837" alt="image" src="https://github.com/user-attachments/assets/d5eec10d-81d9-4f05-9bcf-f6286e41ca02" />

---

## Setup and Installation

To run this project locally, you will need two terminals running simultaneously.

### Backend Setup

1.  Navigate to the `server` directory:
    ```bash
    cd server
    ```
2.  Install the required dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `server` directory and add the following environment variables. Replace the placeholders with your actual keys.
    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    PORT=5000
    ```
4.  Start the backend server:
    ```bash
    npm run dev
    ```
    The server will be running on `http://localhost:5000`.

### Frontend Setup

1.  Open a second terminal and navigate to the `client` directory:
    ```bash
    cd client
    ```
2.  Install the required dependencies:
    ```bash
    npm install
    ```
3.  Start the React development server:
    ```bash
    npm start
    ```
    The application will open automatically in your browser at `http://localhost:3000`.

---

## My AI Usage

This section details my use of AI tools in completing this project, as required by the assessment policy. [cite: 53]

**AI Tool(s) Used:** I primarily used **Google Gemini**. 

**How I Used the AI:** 
**Initial Setup & TDD Workflow:** I used Gemini for step-by-step guidance on setting up the MERN project structure and for walking through the Test-Driven Development (TDD) "Red-Green-Refactor" cycle for every API endpoint. 
    * **Debugging:** Gemini was critical in debugging a wide range of issues, from simple code errors to complex race conditions in the test environment (`MongoNotConnectedError`), persistent `401 Unauthorized` bugs, and local environment problems (PowerShell execution policy, CORS).
    * **Boilerplate Code:** I used the assistant to generate boilerplate code for React components, Express controllers, and test files, which I then modified.
    * **Best Practices:** The AI provided guidance on best practices, such as creating a global test setup file for database connections and using Axios interceptors on the frontend.

**My Reflection:** 
    * *FILL THIS IN YOURSELF. Talk about how Gemini acted as a pair programmer, helping you stay on track and solve problems you were stuck on. Mention how it helped you adhere to the TDD process and accelerated your development and debugging workflow.*

---
