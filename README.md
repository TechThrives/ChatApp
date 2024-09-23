# ChatApp

## Overview

The Chat App is a real-time communication application that allows users to engage in private chats seamlessly. Built with Express.js, MongoDB, React.js, and Socket.IO, it provides a secure environment for messaging.

## Features

- **Real-Time Messaging**: Enables instant communication between users using Socket.IO for smooth message delivery.
- **Secure Account Management**: Users can register and log in securely to access their chat sessions.
- **User-Friendly Interface**: A clean and intuitive design for a better user experience.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Express.js
- **Database**: MongoDB
- **Real-Time Communication**: Socket.IO

## Installation

### Prerequisites

- Node.js
- MongoDB
- Socket.IO

#### 1. Clone the Repository

   ```bash
   git clone https://github.com/TechThrives/ChatApp
   ```

#### 2. Set Up the Back-End
- #### Navigate to the Back-End Directory
``` bash
cd Backend
```

- #### Install Dependencies
```bash
npm install
```

- #### Configure Environment Variables
    In the root directory of your React App, create a file named `.env`.
    
    Open the `.env` file and add the following environment variables:

    - **`PORT`**: Specifies the port on which the backend server will listen.

    - **`MONGO_URI`**: Connection string for MongoDB, including credentials and database information.

    - **`JWT_SECRET`**: Secret key used for signing JSON Web Tokens.

    - **`FRONTEND_URL`**: URL of the frontend application for CORS configuration.

    By setting these environment variables, you ensure that your application is configured correctly for different environments and scenarios.

- #### Start the Back-End
``` bash
npm start
```

#### 3. Set Up the Front-End
- #### Navigate to the Front-End Directory
``` bash
cd Ffrontend
```

- #### Install Dependencies
```bash
npm install
```

- #### Configure Environment Variables
    In the root directory of your React App, create a file named `.env`.
    
    Open the `.env` file and add the following environment variables:

    - **`REACT_APP_API_URL`**: URL of the backend server that the React application will communicate with.

    By setting these environment variables, you ensure that your application is configured correctly for different environments and scenarios.

- #### Start the Front-End
``` bash
npm start
```

#### 5. Access the Application
Open your browser and go to http://localhost:3000 to start using the app.

## Usage
**Registration & Login**: Securely register and log in using your credentials.

**Start a Chat**: Initiate a one-to-one chat with another user.

**Send Messages**: Communicate in real-time with instant message delivery.

## Contributing
We welcome contributions from the community. To contribute to this project, please follow these guidelines:

- Fork the repository
- Create a new branch for your feature or bug fix
- Make your changes and ensure they are well-tested
- Create a pull request to the main branch of the original repository

## Developers
- Omkar Kanade [@omkarkanade](https://www.github.com/omkarkanade)
- Swarup Kanade [@swarupkanade](https://www.github.com/swarupkanade)