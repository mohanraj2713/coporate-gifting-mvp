# Corporate Gifting MVP - Project Summary

## Application Overview

A comprehensive corporate gifting platform that enables companies to:
- Browse and select gifts from a curated catalog
- Create gifting campaigns for various occasions
- Manage recipients (employees and customers)
- Place orders and track deliveries
- Generate reports and analytics

## Technology Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **UI Components**: Custom components with Radix UI primitives

### Backend
- **Server Framework**: Next.js API Routes
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: NextAuth.js with JWT
- **Validation**: Zod
- **Utilities**: bcryptjs for password hashing

## Key Features Implemented

### 1. Authentication System
- Company registration with company profile creation
- User login with JWT authentication
- Role-based access control (Admin, Manager)
- Protected routes for authenticated users

### 2. Gift Catalog
- Browse gifts by category (Employee Kits, Electronics, Bags, Apparel, Drinkware, etc.)
- Search and filter functionality
- View gift details including pricing and customization options
- Minimum order quantity requirements
- Customization availability indicators

### 3. Campaign Management
- Create new campaigns with:
  - Campaign name and occasion
  - Gift selection
  - Quantity and budget
  - Delivery date
  - Personalized message
  - Company branding options
- Track campaign status (draft, pending, approved, processing, shipped, delivered)

### 4. Recipient Management
- Add recipients manually with:
  - Name, email, phone
  - Address details
  - Department information
  - Type (employee/customer)
- Filter recipients by type and campaign

### 5. Order Management
- Create orders from campaigns
- Automatic invoice generation
- Order status tracking (pending, confirmed, processing, shipped, delivered)
- Payment status tracking (pending, paid, failed)
- Delivery tracking with courier information

### 6. Dashboard
- Key performance indicators:
  - Total campaigns
  - Total orders
  - Total recipients
  - Pending orders
  - Total spending
  - Delivered gifts
- Recent activity feed
- Quick action buttons

### 7. Admin Panel
- Manage users and companies
- Manage products and categories
- Monitor campaigns and orders
- System status monitoring

### 8. Reports
- Campaign analytics
- Order reports
- Recipient breakdown
- Spending patterns
- Delivery success rates
- Time-based filtering (last 7 days, 30 days, 6 months, year)

## Database Schema

### Companies
- Name, Logo, Address, Contact, Created At

### Users
- Name, Email, Password (hashed), Company Reference, Role (admin/manager), Created At

### Gifts
- Name, Description, Price, Category, Image URL, Min Order Quantity, Customization Available, Created At

### Campaigns
- Name, Occasion, Gift Reference, Quantity, Budget, Delivery Date, Message, Logo, Company Reference, Status, Created At

### Recipients
- Name, Email, Phone, Address, Department, Type (employee/customer), Campaign Reference, Created At

### Orders
- Campaign Reference, Recipient Reference, Gift Reference, Quantity, Status, Tracking Number, Courier, Delivery Date, Invoice, Payment Status, Created At, Updated At

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new company and user
- `POST /api/auth/login` - Login to existing account

### Gifts
- `GET /api/gifts` - Get all gifts with optional filters

### Campaigns
- `GET /api/campaigns` - Get all campaigns
- `POST /api/campaigns` - Create new campaign

### Recipients
- `GET /api/recipients` - Get all recipients
- `POST /api/recipients` - Add new recipient

### Orders
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create new order

## Project Structure

```
corporate-gifting-mvp/
├── app/
│   ├── api/              # API routes
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── gifts/
│   │   ├── campaigns/
│   │   ├── recipients/
│   │   └── orders/
│   ├── (auth)/           # Public pages (login, register)
│   ├── dashboard/
│   ├── gifts/
│   ├── campaigns/
│   ├── recipients/
│   ├── orders/
│   ├── admin/
│   └── reports/
├── components/           # React components
│   ├── Navbar.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Input.tsx
│       └── Label.tsx
├── lib/                  # Utilities
│   ├── auth.ts
│   ├── jwt.ts
│   ├── mongodb.ts
│   └── utils.ts
├── models/               # MongoDB schemas
│   ├── Company.ts
│   ├── User.ts
│   ├── Gift.ts
│   ├── Campaign.ts
│   ├── Recipient.ts
│   └── Order.ts
└── public/
```

## Getting Started

1. Install dependencies: `npm install`
2. Configure environment: Copy `.env.local.example` to `.env.local` and update values
3. Start MongoDB: Ensure MongoDB is running locally or use MongoDB Atlas
4. Run development server: `npm run dev`
5. Open browser: Navigate to `http://localhost:3000`

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import repository to Vercel
3. Add environment variables
4. Deploy

### MongoDB Atlas
1. Create free cluster
2. Get connection string
3. Update `MONGODB_URI` in environment variables
4. Update IP access list

## Key Design Decisions

### Why Next.js?
- Server-side rendering for better SEO
- API routes for backend functionality
- App Router for modern React patterns
- Built-in optimization features

### Why MongoDB?
- Flexible schema for evolving requirements
- Excellent TypeScript support with Mongoose
- Easy to set up locally
- Scalable with MongoDB Atlas

### Why Tailwind CSS?
- Rapid UI development
- Consistent design system
- Responsive by default
- Customizable configuration

## Future Enhancements

1. **Email Notifications**: Send order confirmations and updates
2. **Payment Integration**: Add Stripe or PayPal for payments
3. **Bulk Upload**: CSV/Excel import for recipients
4. **Custom Branding**: Upload company logo and customize colors
5. **Delivery Tracking**: Integrate with shipping carriers
6. **Analytics Dashboard**: Advanced charts and metrics
7. **Multi-language Support**: Internationalization
8. **Mobile App**: Native iOS and Android applications

## Support and Maintenance

For questions or issues, please refer to:
- Project documentation
- Code comments
- Error messages
- Console logs

## License

MIT License - See LICENSE file for details
