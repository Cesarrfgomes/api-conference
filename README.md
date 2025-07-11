# API Conference - Papa Materiais

API para gerenciamento de conferência e cálculos de preços.

## 🚀 Quick Start

### Development

```bash
npm run dev
```

### Build and Install as Windows Service

```bash
# Complete build and installation
node scripts/build-and-install.js

# Or step by step:
npm install
npm run build
npm run build:exe
npm run install-service
```

## 📦 Build Options

### Build Executable Only

```bash
# Windows only
npm run build:exe

# All platforms (Windows, Linux, macOS)
npm run build:exe:all
```

### Service Management

```bash
# Install as Windows service
npm run install-service

# Start service
npm run start-service

# Stop service
npm run stop-service

# Remove service
npm run uninstall-service
```

## 🔧 Service Configuration

The API will be installed as a Windows service with the following properties:

-   **Name:** API Conference
-   **Description:** Papa Materiais API Conference Service
-   **Startup Type:** Automatic
-   **Port:** 3333
-   **Environment:** Production

## 📋 API Endpoints

### Authentication

-   `POST /auth` - User authentication

### Users

-   `GET /usuarios` - Search users by name tags

### Factories

-   `POST /factories` - Create new factory
-   `GET /factories` - List all factories
-   `GET /factories/:name` - Get factory by name

### Calculations

-   `POST /calculos` - Create product price calculation
-   `GET /calculos` - List user calculations (paginated)
-   `GET /calculos/:id` - Get calculation by ID

### Order Management

-   `GET /om/:id` - Get order management by number
-   `POST /om/:id/iniciar` - Start separation
-   `POST /om/:id/finalizar` - Finalize separation

## 📚 Documentation

Once the service is running, access the Swagger documentation at:

```
http://localhost:3333/documentation
```

## 🛠️ Requirements

-   Node.js 18+
-   PostgreSQL
-   Oracle Database
-   Windows (for service installation)

## 📁 Project Structure

```
src/
├── app.ts                 # Main application entry
├── config/               # Database configurations
├── http/                 # HTTP layer (routes, controllers, middlewares)
├── repositories/         # Data access layer
├── use-cases/           # Business logic
├── types/               # TypeScript type definitions
└── env/                 # Environment configuration

scripts/
├── install-service.js    # Windows service installer
├── uninstall-service.js  # Windows service uninstaller
└── build-and-install.js # Complete build and install script
```

## 🔍 Troubleshooting

### Service Won't Start

1. Check Windows Event Viewer for errors
2. Verify database connections
3. Ensure environment variables are set
4. Check if port 3333 is available

### Build Errors

1. Ensure all dependencies are installed: `npm install`
2. Check TypeScript compilation: `npm run build`
3. Verify pkg installation: `npm install -g pkg`

### Database Connection Issues

1. Verify PostgreSQL and Oracle are running
2. Check connection strings in environment variables
3. Ensure network connectivity to database servers

## 📞 Support

For issues or questions, check the logs in Windows Event Viewer or contact the development team.
