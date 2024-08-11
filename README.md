# Social_Cats
This project is a back-end API for a social network application where users can share their thoughts, react to friends’ thoughts, and manage a friend list. The API is built using Node.js, Express.js, and MongoDB, with Mongoose as the ODM (Object Data Modeling) library. The API allows users to perform CRUD operations on users, thoughts, and reactions.

## Table of Contents
 - Installation
 - Usage
 - API Endpoints
     - Users
     - Thoughts
     - Reactions
 - Technologies Used
 - License
 - Contact

## Installation
1. Clone the repository:
      ```bash
      git clone https://github.com/yourusername/social-network-api.git

2. Navigate to the project directory:
     ```bash
     cd social_cats

3. Install the dependencies:
Make sure you have Node.js and npm installed. Then run the following command to install the required dependencies.
     ```bash
     npm install

4. Set up MongoDB
Ensure you have MongoDB installed and running. You can either use a local MongoDB server or a cloud-based MongoDB service like MongoDB Atlas.

5. Set up environment variables:
Create a .env file in the root of the project and add the following environment variables:
     ```bash
     MONGODB_URI=mongodb://localhost:27017/socialNetworkDB
     PORT=3000
Replace the MONGODB_URI value with your actual MongoDB connection string if you're using MongoDB Atlas or a different setup.

6. Start Server:
Start the server with the following command
    ```bash
    npm start
The server should start on the port specified in your .env file, or on port 3000 if no port is specified.

## Usage
Once the server is running, you can interact with the API using an API client like Insomnia or Postman. The API provides endpoints to manage users, thoughts, and reactions.

## API Endpoints

### Users
  - Get all users:
    `GET /api/users`

  - Get a single user by ID:
    `GET /api/users/:id`
    
  - Create a new user:
    `POST /api/users`
    ```bash
    {
      "username": "newuser",
      "email": "newuser@example.com"  
    }
  - Update a user by ID:
    `PUT /api/users/:id`
    ```bash
    {
      "username": "updateduser",
      "email": "updateduser@example.com"
    }
  - Delete a user by ID:
    `DELETE /api/users/:id`
    
  - Add a friend:
    `POST /api/users/:userId/friends/:friendId`
    
  - Remove a friend:
    `DELETE /api/users/:userId/friends/:friendId`
    
### Thoughts
  - Get all thoughts:
    `GET /api/thoughts`
    
  - Get a single thought by ID:
    `GET /api/thoughts/:id`
    
  - Create a new thought:
    `POST /api/thoughts`
    ```bash
    {
      "thoughtText": "Here's a cool thought...",
      "username": "username",
      "userId": "userId"
    }

   - Update a thought by ID:
     `PUT /api/thoughts/:id`
     ```bash
    {
      "thoughtText": "Updated thought text"
    }

   - Delete a thought by ID:
     `DELETE /api/thoughts/:id`

### Reactions
  - Create a reaction to a thought:
    `POST /api/thoughts/:thoughtId/reactions`
     ```bash
     {
      "reactionBody": "This is a great thought!",
      "username": "username"
     }

  - Delete a reaction by ID:
    `DELETE /api/thoughts/:thoughtId/reactions/:reactionId`

## Technologies Used
 - Node.js
 - Express.js
 - MongoDB
 - Mongoose
 - JavaScript

Contact
If you have any questions or feedback, feel free to reach out:

Name: Ashley Morgan
GitHub: SirMeOWski22
