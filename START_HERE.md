# 🚀 Corporate Gifting MVP - Start Here

## Quick Start (3 Steps)

### 1️⃣ Install Dependencies
```bash
npm install
```

### 2️⃣ Start MongoDB
- **Option A:** Install MongoDB locally
- **Option B:** Use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Free)

### 3️⃣ Run the Application
```bash
npm run dev
```

Then open your browser to `http://localhost:3000`

---

## 📋 What's Included

### Complete Features:
- ✅ Authentication (Login/Register)
- ✅ Gift Catalog with Categories
- ✅ Campaign Management
- ✅ Recipient Management
- ✅ Order Tracking
- ✅ Dashboard with Analytics
- ✅ Admin Panel
- ✅ Reports & Analytics

### Tech Stack:
- **Frontend:** Next.js 14 + React + TypeScript + Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** MongoDB + Mongoose
- **Auth:** NextAuth.js

---

## 📁 Project Structure

```
corporate-gifting-mvp/
├── app/                    # Application pages
│   ├── api/               # Backend API routes
│   ├── (auth)/            # Login & Registration
│   ├── dashboard/         # Main dashboard
│   ├── gifts/             # Gift catalog
│   ├── campaigns/         # Campaign management
│   ├── recipients/        # Recipient management
│   ├── orders/            # Order tracking
│   ├── admin/             # Admin panel
│   └── reports/           # Reports & analytics
├── components/            # React components
├── lib/                   # Utilities & helpers
├── models/                # Database models
└── public/                # Static files
```

---

## 🎯 Key Features

### 1. Authentication
- Secure login with JWT
- Company registration
- Role-based access (Admin, Manager)

### 2. Gift Catalog
- Browse by category
- Search & filter
- Product details
- Customization options

### 3. Campaign Management
- Create campaigns
- Add recipients
- Track progress
- Manage status

### 4. Order Management
- Order tracking
- Invoice generation
- Delivery tracking
- Payment status

### 5. Dashboard
- Key metrics
- Recent activity
- Quick actions

### 6. Reports
- Campaign reports
- Order analytics
- Spending breakdown
- Delivery stats

---

## 📚 Documentation

- **README.md** - Main documentation
- **SETUP_GUIDE.md** - Detailed setup instructions
- **SETUP_INSTRUCTIONS.md** - Step-by-step guide
- **PROJECT_SUMMARY.md** - Technical overview

---

## 🔧 Default Credentials

After seeding the database:
- **Email:** `admin@testcorporation.com`
- **Password:** `password123`

---

## 🎨 Customization

### Change Branding Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: {
    500: '#3b82f6', // Change this color
  }
}
```

### Add Your Logo
Place logo in `public/` and update components.

---

## 🚢 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

### MongoDB Atlas
1. Create free cluster
2. Get connection string
3. Update `.env.local`
4. Deploy

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```bash
# Check if MongoDB is running
# Or use MongoDB Atlas (cloud)
```

### Port Already in Use
```bash
# Kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Dependencies Issue
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

---

## 📞 Next Steps

1. Run `npm install` to install dependencies
2. Set up MongoDB (local or Atlas)
3. Run `npm run dev` to start the app
4. Customize branding and content
5. Deploy to production

---

## 💡 Tips

- Start with the dashboard to see the overview
- Use the Gift Catalog to browse available gifts
- Create a test campaign to understand the workflow
- Check Reports for analytics and insights

---

## 📄 License

MIT License - Free to use and modify

---

**Happy Coding! 🎉**

For questions, check the documentation files or contact support.