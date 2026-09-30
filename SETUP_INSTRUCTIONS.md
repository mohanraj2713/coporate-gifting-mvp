# Corporate Gifting MVP - Setup Instructions

## Quick Setup (15-30 minutes)

### Step 1: Install Node.js Dependencies

Open a terminal in the project directory and run:

```bash
npm install
```

### Step 2: Install MongoDB

**Windows:**
1. Download MongoDB Community Edition from https://www.mongodb.com/try/download/community
2. Install with default settings
3. MongoDB service will start automatically

**macOS:**
```bash
# Using Homebrew
brew install mongodb-community
brew services start mongodb-community
```

**Linux:**
```bash
# Ubuntu/Debian
sudo apt-get install -y mongodb
sudo systemctl start mongodb
```

**Or use MongoDB Atlas (Cloud - Free):**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a free cluster
4. Get your connection string
5. Update `MONGODB_URI` in `.env.local`

### Step 3: Configure Environment

1. Open `.env.local` file in the project root
2. Update `MONGODB_URI` if using MongoDB Atlas
3. Keep other values as default for development

### Step 4: Run the Application

```bash
npm run dev
```

The application will start on `http://localhost:3000`

### Step 5: Seed the Database (Optional)

To add sample data:

```bash
npx ts-node lib/seed.ts
```

### Step 6: Login

Use the following credentials:
- **Email:** `admin@testcorporation.com`
- **Password:** `password123`

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Seed database with sample data
npx ts-node lib/seed.ts
```

## Project Structure Overview

```
corporate-gifting-mvp/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── auth/                 # Authentication endpoints
│   │   │   ├── [...nextauth]/   # NextAuth route
│   │   │   ├── login/           # Login API
│   │   │   └── register/        # Registration API
│   │   ├── gifts/               # Gift management
│   │   ├── campaigns/           # Campaign management
│   │   ├── recipients/          # Recipient management
│   │   └── orders/              # Order management
│   ├── (auth)/                   # Auth pages (login, register)
│   ├── dashboard/                # User dashboard
│   ├── gifts/                    # Gift catalog
│   ├── campaigns/                # Campaign management
│   ├── recipients/               # Recipient management
│   ├── orders/                   # Order management
│   ├── admin/                    # Admin panel
│   └── reports/                  # Reports and analytics
├── components/                   # React Components
│   ├── Navbar.tsx               # Navigation bar
│   └── ui/                      # UI Components
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Input.tsx
│       └── Label.tsx
├── lib/                          # Utilities
│   ├── auth.ts                  # Auth configuration
│   ├── jwt.ts                   # JWT utilities
│   ├── mongodb.ts               # MongoDB connection
│   ├── utils.ts                 # Helper functions
│   └── seed.ts                  # Database seeder
├── models/                       # MongoDB Models
│   ├── Company.ts
│   ├── User.ts
│   ├── Gift.ts
│   ├── Campaign.ts
│   ├── Recipient.ts
│   └── Order.ts
├── public/                       # Static assets
├── .env.local                    # Environment variables
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript configuration
├── next.config.js               # Next.js configuration
└── tailwind.config.ts           # Tailwind CSS configuration
```

## Key Features Implemented

### 1. Authentication System
- ✅ Company registration
- ✅ User login/logout
- ✅ JWT-based authentication
- ✅ Role-based access (Admin, Manager)
- ✅ Protected routes

### 2. Gift Catalog
- ✅ Browse gifts by category
- ✅ Search functionality
- ✅ Filter by customization
- ✅ Gift details page
- ✅ Price and quantity info

### 3. Campaign Management
- ✅ Create new campaigns
- ✅ Select gifts for campaigns
- ✅ Add recipients to campaigns
- ✅ Customize with branding
- ✅ Track campaign status

### 4. Recipient Management
- ✅ Add recipients manually
- ✅ View recipient list
- ✅ Filter by type (employee/customer)
- ✅ Search functionality

### 5. Order Management
- ✅ Create orders from campaigns
- ✅ Track order status
- ✅ Generate invoices
- ✅ Payment status tracking
- ✅ Delivery tracking

### 6. Dashboard
- ✅ Key metrics display
- ✅ Recent activity feed
- ✅ Quick action buttons
- ✅ Stats summary

### 7. Admin Panel
- ✅ Manage users
- ✅ Manage companies
- ✅ Monitor system status
- ✅ View analytics

### 8. Reports
- ✅ Campaign reports
- ✅ Order reports
- ✅ Spending analytics
- ✅ Delivery success rates

## Troubleshooting

### MongoDB Connection Issues

**Error:** `MongoServerError: connect ECONNREFUSED`

**Solution:**
1. Ensure MongoDB is running
2. Check `MONGODB_URI` in `.env.local`
3. Verify MongoDB is accessible

### Port Already in Use

**Error:** `Error: listen EADDRINUSE: address already in use :::3000`

**Solution:**
```bash
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (Windows)
taskkill /PID <PID> /F
```

### Dependency Issues

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules
rm -rf node_modules

# Reinstall dependencies
npm install
```

### TypeScript Errors

**Solution:**
```bash
# Clean build
rm -rf .next
npm run build
```

## Next Steps

1. **Customize the application:**
   - Update branding colors in `tailwind.config.ts`
   - Modify gift categories and options
   - Add your company logo

2. **Deploy to production:**
   - Set up MongoDB Atlas
   - Configure production environment variables
   - Deploy to Vercel or your hosting provider

3. **Add additional features:**
   - Email notifications
   - Payment integration
   - Bulk CSV upload
   - Advanced analytics

## Support

For questions or issues:
1. Check the documentation
2. Review error messages
3. Check console logs
4. Contact development team

## License

MIT License