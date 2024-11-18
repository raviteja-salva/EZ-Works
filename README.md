# Secure File Sharing System

A secure file-sharing system built with Node.js, Express, and MongoDB that allows operational users to upload files and client users to download them. The system includes user authentication, email verification, and role-based access control.

## Features

- **User Authentication**
  - Secure signup and login
  - Email verification
  - JWT-based authentication
  - Role-based access control (Operations & Client users)

- **File Management**
  - Secure file upload (Operations users only)
  - File download functionality
  - File listing
  - Support for specific file types (pptx, docx, xlsx)
  - File size restrictions

- **Security Features**
  - Password hashing
  - JWT token authentication
  - Email verification
  - Role-based permissions
  - File type validation
  - Secure file storage

## Project Structure

```
├── config/
│   ├── database.js    # MongoDB connection configuration
│   ├── multer.js      # File upload configuration
│   └── mailer.js      # Email service configuration
├── controllers/
│   ├── authController.js    # Authentication logic
│   └── fileController.js    # File management logic
├── middleware/
│   └── validators.js        # Input validation and auth middleware
├── models/
│   ├── User.js       # User model schema
│   └── File.js       # File model schema
├── routes/
│   ├── authRoutes.js  # Authentication routes
│   └── fileRoutes.js  # File management routes
├── uploads/           # File storage directory
├── app.js            # Main application file
├── .env              # Environment variables
└── README.md         # Project documentation
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Gmail account (for sending verification emails)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd secure-file-sharing
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password
BASE_URL=http://localhost:3000
```

4. Create the uploads directory:
```bash
mkdir uploads
```

5. Start the server:
```bash
npm start
```

## API Endpoints

### Authentication

- **POST /api/auth/signup**
  - Register a new user
  - Body: `{ "email": "user@example.com", "password": "password123", "role": "client" }`

- **POST /api/auth/login**
  - Login user
  - Body: `{ "email": "user@example.com", "password": "password123" }`

- **GET /api/auth/verify/:token**
  - Verify user's email

### File Management

- **POST /api/files/upload**
  - Upload a file (Operations users only)
  - Headers: `Authorization: Bearer <token>`
  - Body: Form-data with file

- **GET /api/files/list**
  - List all files
  - Headers: `Authorization: Bearer <token>`

- **GET /api/files/download/:id**
  - Download a specific file
  - Headers: `Authorization: Bearer <token>`

## Security Considerations

1. **File Upload Security**
   - Only specific file types allowed (pptx, docx, xlsx)
   - File size limit: 5MB
   - Only Operations users can upload files

2. **User Authentication**
   - Passwords are hashed using bcrypt
   - JWT tokens for authentication
   - Email verification required
   - Role-based access control

3. **Input Validation**
   - Request body validation
   - File type validation
   - Proper error handling

## Error Handling

The API returns appropriate HTTP status codes and error messages:
- 200: Success
- 201: Resource created
- 400: Bad request
- 401: Unauthorized
- 403: Forbidden
- 404: Not found
- 500: Server error

## Development

To run the application in development mode with nodemon:
```bash
npm install nodemon --save-dev
npx nodemon app.js
```

## Testing API Endpoints

You can test the API endpoints using Postman or curl:

1. **Create a Client User:**
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"client@example.com","password":"Password123","role":"client"}'
```

2. **Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"client@example.com","password":"Password123"}'
```

3. **Upload File (Ops User):**
```bash
curl -X POST http://localhost:3000/api/files/upload \
  -H "Authorization: Bearer <your-token>" \
  -F "file=@/path/to/your/file.xlsx"
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License.