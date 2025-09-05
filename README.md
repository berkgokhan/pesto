# Pesto - Recipe Discovery Platform

Pesto is a modern recipe discovery platform built with Next.js, featuring user authentication, role-based access control, and a beautiful Material Design-inspired interface.

## Features

### Authentication & Authorization
- **NextAuth.js Integration**: Secure authentication with JWT sessions
- **Role-Based Access Control**: User and Admin roles with different permissions
- **Protected Routes**: Middleware-based route protection
- **Session Management**: Automatic session handling and persistence

### Recipe Management
- **Recipe Discovery**: Browse and search through a curated collection of recipes
- **Advanced Search**: Filter by tags, sort by popularity, and pagination
- **Recipe Details**: Rich recipe pages with images, descriptions, and metadata
- **Admin Controls**: Delete recipes and manage featured content (Admin only)

### Modern UI/UX
- **Material Design**: Clean, modern interface with consistent design system
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Theme**: Adaptive color scheme with proper contrast
- **Interactive Elements**: Smooth animations and hover effects

### Technical Features
- **Server-Side Rendering**: Fast initial page loads with Next.js App Router
- **Type Safety**: Full TypeScript support throughout the application
- **API Routes**: RESTful API with proper error handling and authentication
- **Mock Database**: In-memory database for development and testing

## Getting Started

### Prerequisites
- Node.js 18+ or Bun
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pesto
   ```

2. **Install dependencies**
   ```bash
   bun install
   # or
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   # NextAuth.js Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here
   ```

4. **Run the development server**
   ```bash
   bun dev
   # or
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Demo Accounts

The application includes demo accounts for testing different user roles:

### Regular User
- **Email**: `demo@pesto.com`
- **Password**: `demo123`
- **Permissions**: View recipes, search, browse content

### Admin User
- **Email**: `admin@pesto.com`
- **Password**: `admin123`
- **Permissions**: All user permissions + delete recipes, manage featured content

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── recipe/            # Recipe detail pages
│   └── recipes/           # Recipe listing pages
├── components/            # Reusable UI components
│   ├── layout/           # Layout components (Header, Footer)
│   ├── search/           # Search-related components
│   └── sections/         # Page sections
├── contexts/             # React contexts
├── lib/                  # Utility libraries
│   ├── api.ts           # API client functions
│   ├── api-auth.ts      # Authentication utilities
│   ├── auth.ts          # NextAuth configuration
│   └── mock-database.ts # Mock database
└── types/               # TypeScript type definitions
```

## API Endpoints

### Public Endpoints
- `GET /api/recipes/popular` - Get featured recipes
- `GET /api/recipes/search` - Search recipes
- `GET /api/recipes/[slug]` - Get recipe by slug

### Protected Endpoints (Admin Only)
- `DELETE /api/recipes/[slug]` - Delete recipe
- `POST /api/recipes/popular` - Add featured recipe
- `DELETE /api/recipes/popular` - Remove featured recipe

## Security Features

- **JWT-based Sessions**: Secure token-based authentication
- **Role-based Authorization**: Granular permission system
- **Route Protection**: Middleware-based access control
- **Input Validation**: Proper request validation and sanitization
- **Error Handling**: Secure error messages without information leakage

## Design System

The application uses a custom design system inspired by Material Design:

- **Color Palette**: Semantic color tokens for consistent theming
- **Typography**: Montserrat and Roboto font families
- **Spacing**: Consistent spacing scale using Tailwind CSS
- **Components**: Reusable UI components with proper accessibility

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [NextAuth.js](https://next-auth.js.org/) - Authentication for Next.js
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Lucide React](https://lucide.dev/) - Beautiful icon library
- [Material Design](https://material.io/) - Design system inspiration
