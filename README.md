# Univora — Social Development Events Platform

**Connecting People. Empowering Communities. Creating Change.**

Univora is a community-driven social development and event management platform designed to bring people together through meaningful initiatives. Users can discover upcoming community events, organize social activities, participate in volunteer programs, and make a positive impact in their local communities.

🌐 **Live Website:** https://univora-pi.vercel.app/

---

## Features

- **User Authentication:** Secure registration and login with email/password and Google authentication using Better Auth.
- **Create Events:** Authenticated users can organize community events by providing event details, categories, locations, dates, and images.
- **Discover Events:** Explore upcoming social development events through a dynamic and responsive event listing.
- **Join Events:** Participate in community initiatives and keep track of joined events.
- **Manage Events:** Organizers can update and delete their own events.
- **Personal Dashboard:** Manage created events and view joined events in one place.
- **Protected Routes:** Secure access to private pages and APIs using authentication and JWT verification.
- **Light & Dark Mode:** Switch between light and dark themes.
- **Responsive Design:** Optimized experience across desktop, tablet, and mobile devices.
- **Interactive Notifications:** Get feedback through toast notifications for important actions.

## Technology Stack

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- DaisyUI / UI Components
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB
- JavaScript / TypeScript

### Authentication & Security
- Better Auth
- MongoDB Adapter
- JWT Authentication
- Google OAuth
- Protected API Routes

### Deployment
- Vercel — Frontend
- Vercel — Backend

## Project Repositories

| Repository | Link |
|---|---|
| Client | https://github.com/shamsu082277/univora |
| Server | https://github.com/shamsu082277/univora-server |
| Live Website | https://univora-pi.vercel.app/ |

## Getting Started

Follow these instructions to run the project locally.

### Prerequisites

- Node.js (LTS)
- npm
- MongoDB database
- Git

### 1. Clone the Frontend

```bash
git clone https://github.com/shamsu082277/univora.git
cd univora
npm install
```

### 2. Configure Frontend Environment Variables

Create a `.env.local` file in the root directory.

```env
NEXT_PUBLIC_API_URL=your_backend_api_url
NEXT_PUBLIC_BETTER_AUTH_URL=your_better_auth_url
```

Add other environment variables if required by your application.

### 3. Run the Frontend

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### 4. Clone the Backend

```bash
git clone https://github.com/shamsu082277/univora-server.git
cd univora-server
npm install
```

### 5. Configure Backend Environment Variables

Create a `.env` file in the backend root directory.

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_secure_secret
CLIENT_URL=http://localhost:3000
```

Configure the remaining authentication, OAuth, and deployment variables according to the backend implementation.

### 6. Run the Backend

```bash
npm run dev
```

The backend will run on the configured port.

## Main Application Pages

| Page | Access | Description |
|---|---|---|
| Home | Public | Explore Univora and discover recent events. |
| Upcoming Events | Public | Browse available community events. |
| Event Details | Public | View complete event information. |
| Login | Public | Sign in to your account. |
| Register | Public | Create a new account. |
| Create Event | Private | Organize a new community event. |
| Manage Events | Private | Update or delete your created events. |
| Joined Events | Private | Track events you have joined. |

## Security

- Authentication-based access control.
- JWT verification for protected API endpoints.
- User-specific event management.
- Backend ownership verification for event modifications.
- Environment variables for sensitive configuration.

## Purpose

Univora aims to make community participation easier by connecting volunteers, organizers, and people who want to contribute to social development.

Whether it is distributing winter clothes, planting trees, cleaning public spaces, or helping people in need, Univora provides a platform to turn good intentions into meaningful actions.

---

**Univora — Together, We Make a Difference.**