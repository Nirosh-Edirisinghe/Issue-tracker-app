# 🚀 Issue Flow

**Issue Flow** is a **MERN stack issue tracker** that helps users manage, track, and organize issues efficiently. Styled with **Tailwind CSS**, it provides a user-friendly experience with real-time notifications.

---

## 🌟 Features

### 🔑 User Authentication
- Users can **register** and **login** securely.
- Passwords hashed with **bcrypt** and authentication using **JWT**.

### 📊 Dashboard
- Shows **counts of issues by status**.
- Displays **latest issues** for quick access.

### 📝 Issues Section
- **Add new issues** with title, description, priority, and status.
- **Filter issues** by priority.
- **Search issues** by title.
- **Export issues** as CSV.
- **View a list** of all issues with basic details.

### 🔍 View Issue Details
- View **full details** of a selected issue.
- **Update issue details**.
- **Delete issues** (only the user who created it can delete).
- **Change issue status** with confirmation prompts.

### 👥 Team Members
- Displays a **list of all users** in the system.

### 🧑 My Profile
- View **profile data**.
- Update profile information and **profile image** (stored in **Cloudinary**).

---

## 🛠 Technology Stack

### Frontend
- React.js ⚛️
- Tailwind CSS 🎨
- Axios 📡
- React Toastify 🔔

### Backend
- Node.js & Express.js 🟢
- MongoDB & Mongoose 🍃
- Bcrypt 🔒
- JWT 🛡️
- Cloudinary ☁️
- Validator ✅

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js installed
- MongoDB installed or MongoDB Atlas
- Cloudinary account

### 1️⃣ Clone Repository

https://github.com/Nirosh-Edirisinghe/Issue-tracker-app.git

cd Issue-tracker-app

# Install backend dependencies
cd Backend
npm install

### 🔧 Setup Environment Variables

**Example `.env` for the backend:**
```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

```
# Run backend
cd Backend
npm run server

# Install frontend dependencies
cd Frontend
npm install

**Example `.env` for the frontend:**
```env
VITE_BACKEND_URL='http://localhost:4000'

```
# Run frontend
cd Frontend
npm run dev

```
⭐ If you like this project, don’t forget to star the repo and share it! ⭐

```



