# Corporate Gifting MVP

A comprehensive corporate gifting platform built with Next.js 14 and MongoDB.

## Features

- **Company Registration & Login**: Secure authentication system
- **Gift Catalog**: Browse and manage gifts with categories and customization options
- **Campaign Management**: Create and manage gifting campaigns
- **Recipient Management**: Add recipients manually or upload in bulk
- **Order Tracking**: Track delivery status and shipping information
- **Dashboard**: View analytics and recent activity
- **Admin Panel**: Manage all aspects of the platform
- **Reports**: Generate detailed reports for campaigns, orders, and spending

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, MongoDB, Mongoose
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **Validation**: Zod

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB installed and running (or MongoDB Atlas account)

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   
   The `.env.local` file is already configured with default values. Update it with your MongoDB connection string if needed.

3. **Start MongoDB**
   
   Make sure MongoDB is running on your system or update the `MONGODB_URI` to use MongoDB Atlas.

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open the application**
   
   Visit `http://localhost:3000` in your browser

### Seed the Database

To populate the database with sample data:

```bash
npx ts-node lib/seed.ts
```

**Default login credentials:**
- Email: `admin@testcorporation.com`
- Password: `password123`

## Project Structure

```
corporate-gifting-mvp/
├── app/
│   ├── api/              # API routes
│   │   └── auth/         # Authentication endpoints
│   ├── (auth)/           # Auth pages (login, register)
│   ├── dashboard/        # User dashboard
│   ├── gifts/            # Gift catalog
│   ├── campaigns/        # Campaign management
│   ├── recipients/       # Recipient management
│   ├── orders/           # Order tracking
│   └── admin/            # Admin panel
├── components/           # React components
├── lib/                  # Utilities and helpers
├── models/               # MongoDB schemas
└── public/               # Static assets
```

## Key Features

### Authentication
- User registration with company creation
- Secure login with JWT authentication
- Role-based access control (Admin, Manager)

### Gift Catalog
- Browse gifts by category
- Search functionality
- Filter by customization availability
- View gift details and pricing

### Campaign Management
- Create new campaigns
- Add recipients to campaigns
- Customize gifts with company branding
- Track campaign status

### Order Management
- Order tracking
- Invoice generation
- Payment status management
- Delivery tracking

### Analytics
- Dashboard with key metrics
- Campaign analytics
- Order reports
- Spending breakdown

## Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB connection string |
| `NEXTAUTH_SECRET` | Secret key for JWT tokens |
| `NEXTAUTH_URL` | Application URL |

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new company and user
- `POST /api/auth/login` - Login to existing account
- `GET /api/auth/session` - Get current session

### Gifts
- `GET /api/gifts` - Get all gifts
- `POST /api/gifts` - Create new gift (Admin only)

### Campaigns
- `GET /api/campaigns` - Get all campaigns
- `POST /api/campaigns` - Create new campaign
- `PUT /api/campaigns/:id` - Update campaign

### Recipients
- `GET /api/recipients` - Get recipients
- `POST /api/recipients` - Add recipient
- `POST /api/recipients/bulk` - Bulk upload recipients

### Orders
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order status

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Import your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### MongoDB Atlas

1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Get your connection string
3. Update `MONGODB_URI` in environment variables
4. Update your IP access list

## Contributing

1. Create a branch for your feature
2. Commit your changes
3. Push to the branch
4. Create a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions, please contact the development team.
