# Hotel Booking Website

A modern hotel booking application built with React.js and Material UI.

## Features

- Browse available hotel rooms
- Search rooms by date, guests, and amenities
- View detailed room information
- Create an account and login
- Book rooms with date selection
- Manage profile and view booking history
- Mobile-responsive design
- Dark mode support

## Project Structure

- `hotel-booking-react-js`: Modern React implementation with Material UI
- `hotel-booking-server`: Backend API server (optional)

## Quick Start

To run the application:

1. Make sure you have [Node.js](https://nodejs.org/) (v14.x or later) installed

2. Navigate to the project directory:
   ```bash
   cd hotel-booking-react-js
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## Using the Application

The application currently runs with mock data, so you can explore the interface without needing a backend server.

## Authentication

### Login
The application implements a secure, mock authentication system with these features:
- Email and password authentication using React Context API
- Elegant UI with Material UI components and animations
- Password visibility toggle for easier input
- Client-side form validation with clear error messages
- Login state persistence using localStorage
- Protected routes that redirect to login when accessing secure pages
- Demo credentials displayed on the login page
- Error handling for invalid credentials
- Navigation to previously attempted page after successful login
- Enhanced security with complex password requirements

### Registration
New users can create an account through a comprehensive registration form:
- Full name, email, and phone number fields with validation
- Password requirements: minimum 6 characters length
- Password confirmation with matching validation
- Form field validation with appropriate error messages
- Mock implementation that simulates checking for existing emails
- Secure storage of user details in localStorage for persistence
- Clean, responsive form layout with a two-column design on larger screens
- Automatic login and redirection upon successful registration
- Real-time feedback during form submission

## Demo Credentials

For testing purposes, you can use the following demo credentials:

- **Email**: test@example.com
- **Password**: SecurePass@123

or

- **Email**: kumarabhi45380@gmail.com
- **Password**: SecurePass@123

## Hosting and Backend Setup

### Frontend Deployment

The React frontend can be deployed to various hosting platforms:

1. **Vercel** (Recommended for React apps):
   - Sign up for a free account at [vercel.com](https://vercel.com)
   - Install Vercel CLI: `npm install -g vercel`
   - Run `vercel` in the project root directory
   - Follow the prompts to deploy

2. **Netlify**:
   - Sign up for a free account at [netlify.com](https://netlify.com)
   - Build the project: `npm run build`
   - Drag and drop the `build` folder to Netlify's dashboard or use their CLI tool

3. **GitHub Pages**:
   - Add `"homepage": "https://yourusername.github.io/repo-name"` to package.json
   - Install gh-pages: `npm install --save-dev gh-pages`
   - Add deploy scripts to package.json:
     ```json
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
     ```
   - Run `npm run deploy`

### Backend Server Setup

The application includes a complete Express.js backend in the `hotel-booking-server` directory. To set it up:

1. **Install MongoDB**:
   - [Download and install MongoDB](https://www.mongodb.com/try/download/community)
   - Create a database named `hotel-booking`
   - Or use MongoDB Atlas for a cloud-hosted solution

2. **Configure the Backend**:
   - Navigate to the server directory: `cd hotel-booking-server`
   - Install dependencies: `npm install`
   - Update the `.env` file with your configuration:
     ```
     PORT=8000
     NODE_ENV=development
     MONGO_URI=mongodb://localhost:27017/hotel-booking
     JWT_SECRET=your_own_secret_key_here
     JWT_EXPIRE=30d
     ```

3. **Start the Backend Server**:
   - Run `npm start` in the `hotel-booking-server` directory
   - The server will start on port 8000 (or the port specified in your `.env` file)

4. **Connect Frontend to Backend**:
   - Open `hotel-booking-react-js/src/services/api.js`
   - Confirm the API_URL is set to your backend URL:
     ```javascript
     const API_URL = 'http://localhost:8000/api';
     ```
   - Open `hotel-booking-react-js/src/contexts/AuthContext.js`
   - Comment out the mock implementation and uncomment the real API calls

### Deploying the Full Stack Application

1. **Backend Deployment Options**:
   - **Heroku**:
     - Install Heroku CLI and login: `heroku login`
     - Create a new app: `heroku create your-app-name`
     - Set environment variables: `heroku config:set MONGO_URI=your_mongodb_uri JWT_SECRET=your_secret`
     - Push code: `git push heroku main`

   - **Railway**:
     - Create a new project on [railway.app](https://railway.app)
     - Connect your GitHub repository
     - Add MongoDB plugin or connect to external MongoDB
     - Configure environment variables
     - Railway will automatically deploy on push

   - **Render**:
     - Create a new Web Service on [render.com](https://render.com)
     - Connect to your GitHub repository
     - Set build command: `npm install`
     - Set start command: `node server.js`
     - Add environment variables from your `.env` file

2. **Database Deployment**:
   - **MongoDB Atlas** (Recommended):
     - Create a free account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
     - Create a new cluster
     - Set up database user and network access
     - Get connection string and update your backend configuration

3. **Implementing Real-time Features**:
   - The backend is designed to support real-time features using Socket.io
   - To enable real-time updates:
     - Install Socket.io: `npm install socket.io`
     - Add to your server.js:
       ```javascript
       const http = require('http');
       const server = http.createServer(app);
       const io = require('socket.io')(server);
       
       io.on('connection', (socket) => {
         console.log('User connected');
         
         socket.on('bookingCreated', (data) => {
           io.emit('newBooking', data);
         });
         
         socket.on('disconnect', () => {
           console.log('User disconnected');
         });
       });
       
       server.listen(PORT, () => {
         console.log(`Server running on port ${PORT}`);
       });
       ```
     - Configure the React frontend to connect to Socket.io

### Environment Configuration for Production

For production deployment, create a `.env.production` file in the React project:

```
REACT_APP_API_URL=https://your-backend-url.com/api
REACT_APP_SOCKET_URL=https://your-backend-url.com
```

### Security Best Practices

When deploying to production:

- Use HTTPS for all communications
- Update the JWT_SECRET to a strong, unique value
- Configure proper CORS settings in the backend
- Set secure cookies with HttpOnly, Secure, and SameSite flags
- Implement rate limiting to prevent abuse
- Add input validation on both client and server sides
- Set up monitoring and logging
- Regularly update dependencies with `npm audit fix`

## Available Pages

- `/` - Home page
- `/rooms` - Browse all rooms
- `/rooms/:roomId` - View a specific room
- `/login` - Login page
- `/register` - Registration page
- `/profile` - User profile (requires login)
- `/checkout` - Payment and booking confirmation

## Technologies Used

- React.js
- Material UI
- React Router
- Context API for state management
- Dark/Light theme support



