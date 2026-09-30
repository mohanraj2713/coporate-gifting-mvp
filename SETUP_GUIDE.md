# Corporate Gifting MVP - Setup Guide

## Prerequisites

- Node.js 18+ installed
- MongoDB installed locally OR MongoDB Atlas account
- npm or yarn package manager

## Quick Start (30 minutes)

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Configure Environment

Create a `.env.local` file with the following content:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/corporate-gifting

# Auth
NEXTAUTH_SECRET=your-secret-key-here-change-in-production
NEXTAUTH_URL=http://localhost:3000

# App
NEXT_PUBLIC_APP_NAME="Corporate Gifting"
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Step 3: Start MongoDB

**Option A - Local MongoDB:**
```bash
# Make sure MongoDB service is running
# Windows (if installed as service)
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

**Option B - MongoDB Atlas (Cloud):**
1. Create a free account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get your connection string
4. Update the `MONGODB_URI` in `.env.local`

### Step 4: Run the Application

```bash
npm run dev
```

### Step 5: Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

## Application Features

### Authentication
- **Company Registration**: Create a new company account
- **User Login**: Secure login with JWT authentication
- **Role-based Access**: Admin and Manager roles

### Dashboard
- Overview of key metrics
- Recent activity feed
- Quick action buttons

### Gift Catalog
- Browse gifts by category
- Search and filter functionality
- Gift details and pricing
- Customization options

### Campaign Management
- Create new campaigns
- Select gifts for campaigns
- Add recipients
- Customize with company branding
- Track campaign status

### Recipient Management
- Add recipients manually
- Bulk upload CSV
- Manage recipient details
- Filter by type (employee/customer)

### Order Management
- Create orders
- Track order status
- Generate invoices
- Payment status tracking
- Delivery tracking

### Admin Panel
- Manage users
- Manage companies
- Manage products
- Monitor campaigns
- View analytics

### Reports
- Campaign reports
- Order reports
- Recipient reports
- Spending analytics
- Delivery reports

## Project Structure

```
corporate-gifting-mvp/
├── app/
│   ├── api/              # Backend API routes
│   │   ├── auth/         # Authentication endpoints
│   │   ├── gifts/        # Gift management endpoints
│   │   ├── campaigns/    # Campaign management endpoints
│   │   ├── recipients/   # Recipient management endpoints
│   │   └── orders/       # Order management endpoints
│   ├── (auth)/           # Public auth pages
│   │   ├── login/
│   │   └── register/
│   ├── dashboard/        # User dashboard
│   ├── gifts/            # Gift catalog
│   ├── campaigns/        # Campaign management
│   ├── recipients/       # Recipient management
│   ├── orders/           # Order management
│   ├── admin/            # Admin panel
│   └── reports/          # Reports and analytics
├── components/           # React components
│   ├── Navbar.tsx        # Navigation component
│   ├── SessionProvider.tsx
│   └── ui/               # UI components
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Input.tsx
│       └── Label.tsx
├── lib/                  # Utilities
│   ├── auth.ts           # Auth configuration
│   ├── jwt.ts            # JWT utilities
│   ├── mongodb.ts        # MongoDB connection
│   └── utils.ts          # Helper functions
├── models/               # MongoDB schemas
│   ├── Company.ts
│   ├── User.ts
│   ├── Gift.ts
│   ├── Campaign.ts
│   ├── Recipient.ts
│   └── Order.ts
└── public/               # Static assets
```

## Available Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB service is running
- Check your `MONGODB_URI` in `.env.local`
- Verify MongoDB is accessible from your network

### Port Already in Use
```bash
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process
taskkill /PID <PID> /F
```

### Dependencies Issues
```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

1. **Customize Branding**: Update colors and logo in `tailwind.config.ts`
2. **Add Custom Features**: Extend models and API routes as needed
3. **Deploy to Production**: Use Vercel or your preferred hosting
4. **Configure Email**: Set up email notifications for order updates
5. **Add Payment Gateway**: Integrate Stripe or PayPal for payments

## Support

For issues or questions, please check:
- Next.js Documentation: https://nextjs.org/docs
- MongoDB Documentation: https://docs.mongodb.com
- Mongoose Documentation: https://mongoosejs.com/docs

## License

MIT License