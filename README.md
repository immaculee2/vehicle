# Vehicle Registration & Management Platform

## Project Overview

This is a production-grade Vehicle Registration and Management dashboard built as a dynamic, data-driven frontend application. It seamlessly integrates with a robust Express.js backend API that enforces strict data integrity rules. The application demonstrates advanced React development practices including complex form handling, client-side validation, modular data fetching, and authentication state management.

The primary goal is to master real-world challenges such as multi-step form state management, preventing unnecessary API calls through caching, securing protected routes, and providing immediate, user-friendly feedback for strict data constraints.

## Features

### Authentication & Protected Routes
- Client-side authentication using React Context API
- Protected routes that restrict access to sensitive views
- Mock login system with static credentials for demonstration

### Complex Form Management
- Multi-step wizard form for vehicle registration (3 steps: Vehicle Info, Owner, Registration/Insurance)
- Built with React Hook Form and Zod for robust validation
- Strict client-side validation to prevent 422 server errors

### API & Async Handling
- Centralized API utility using Axios
- Robust data fetching with TanStack Query (React Query)
- Loading, success, and error states management
- Automatic query invalidation on mutations

### Modular Component Design
- Reusable UI components (tabs, forms, tables)
- Segmented data views with tabbed interface
- Error boundaries for graceful error handling

### State Management & Caching
- TanStack Query for optimal caching of individual data segments
- Hierarchical query keys for efficient cache management
- Lazy loading of segmented data (info, owner, registration, insurance)

## Tech Stack

- **Frontend Framework**: React 19 with Vite
- **State Management**: TanStack React Query for server state
- **Routing**: React Router DOM with protected routes
- **Forms**: React Hook Form with Zod validation
- **HTTP Client**: Axios with centralized configuration
- **Styling**: Tailwind CSS
- **Build Tool**: Vite with React plugin

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation & Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd vehicle-web/vehicle
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173` (or next available port)

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## State Management Approach

### TanStack Query (React Query) Strategy

The application uses TanStack Query for all server state management, providing:

- **Query Keys**: Hierarchical structure for optimal caching
  - `["vehicles"]` - All vehicles list
  - `["vehicle", id]` - Full vehicle record
  - `["vehicle", id, "info"]` - Vehicle information segment
  - `["vehicle", id, "owner"]` - Owner information segment
  - `["vehicle", id, "registration"]` - Registration details
  - `["vehicle", id, "insurance"]` - Insurance information

- **Mutations**: POST, PUT, DELETE operations with automatic query invalidation
- **Lazy Loading**: Queries enabled conditionally based on route parameters
- **Error Handling**: Centralized error management with user-friendly messages
- **Caching**: Automatic background refetching and stale-while-revalidate

### Authentication State

- **Context API**: Global authentication state with `AuthContext`
- **Session Persistence**: localStorage for login state across browser sessions
- **Route Protection**: `ProtectedRoute` component for access control

## API Integration

### Base Configuration
- **Base URL**: `https://student-management-system-backend.up.railway.app/api`
- **HTTP Client**: Axios with JSON headers
- **Error Handling**: Comprehensive error responses with fallback messages

### Endpoints Used
- `GET /vehicle-service/vehicle` - Public vehicle list
- `POST /vehicle-service/vehicle` - Create new vehicle (protected)
- `GET /vehicle-service/vehicle/:id` - Full vehicle record (protected)
- `PUT /vehicle-service/vehicle/:id` - Update vehicle (protected)
- `DELETE /vehicle-service/vehicle/:id` - Delete vehicle (protected)
- `GET /vehicle-service/vehicle/:id/info` - Vehicle information (protected)
- `GET /vehicle-service/vehicle/:id/owner` - Owner details (protected)
- `GET /vehicle-service/vehicle/:id/registration` - Registration data (protected)
- `GET /vehicle-service/vehicle/:id/insurance` - Insurance information (protected)

## Validation Rules

The application implements strict client-side validation matching backend requirements:

### Vehicle Information
- Manufacture, Model, Body Type, Color: Required strings
- Year: Integer between 1886 and current year + 1
- Engine Capacity, Odometer Reading, Seating Capacity: Positive integers

### Owner Information
- Name, Address: Required strings
- National ID: Exactly 16 digits (`/^\d{16}$/`)
- Mobile Number: Exactly 10 digits (`/^\d{10}$/`)
- Email: Valid email format
- Company Registration: Required when owner type is COMPANY

### Registration & Insurance
- Plate Number: Valid Rwandan format (`/^(R[A-Z]{2}|GR|CD)\s?\d{3}\s?[A-Z]?$/i`)
- Expiry Dates: Cannot be in the past
- Required Documents: All mandatory fields validated

## Deployment

The application is configured for deployment to modern hosting platforms:

### Vercel/Netlify Deployment
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy automatically on push

### Manual Deployment
1. Run `npm run build`
2. Upload the `dist` folder contents to your hosting provider

## Project Structure

```
vehicle/
├── public/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ErrorBoundary.jsx
│   │   ├── Loader.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── Tabs.jsx
│   ├── context/             # React Context for state
│   │   ├── AuthContext.js
│   │   └── AuthProvider.jsx
│   ├── hooks/               # Custom hooks
│   │   └── useVehicle.js
│   ├── pages/               # Route components
│   │   ├── Dashboard.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── RegisterVehicle.jsx
│   │   └── VehicleDetails.jsx
│   ├── services/            # API configuration
│   │   └── api.js
│   ├── utils/               # Utilities
│   │   └── validationSchemas.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
└── README.md
```

## Contributing

1. Follow the existing code structure and naming conventions
2. Implement proper error handling and loading states
3. Add comprehensive validation for new features
4. Test API integrations thoroughly
5. Update this README for any new features

## License

This project is for educational purposes as part of a vehicle management assignment.

### Authentication

- **Login Credentials**: email: `test@gmail.com`, password: `Password!234`
- Uses localStorage for session persistence

### Endpoints Used

- `GET /vehicle` - Public vehicle list
- `POST /vehicle` - Register new vehicle (protected)
- `GET /vehicle-service/vehicle/:id` - Full vehicle details (protected)
- `PUT /vehicle-service/vehicle/:id` - Update vehicle (protected)
- `DELETE /vehicle-service/vehicle/:id` - Delete vehicle (protected)
- Segmented endpoints: `/vehicle-service/vehicle/:id/info`, `/owner`, `/registration`, `/insurance`

## State Management

- **Authentication**: React Context API
- **Data Fetching**: TanStack Query for caching and synchronization
- **Form State**: React Hook Form with Zod validation

## Deployment

Deploy to Vercel, Netlify, or Render. Ensure React Router redirects work in production (SPA fallback to index.html).

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
