# 🚀 Corporate Gifting MVP - Quick Reference

## 🎯 One-Command Start

```bash
npm install && npm run dev
```

## 📱 Application URLs

- **Frontend:** http://localhost:3000
- **Dashboard:** http://localhost:3000/dashboard
- **Admin Panel:** http://localhost:3000/admin

## 🔐 Login Credentials

```
Email: admin@testcorporation.com
Password: password123
```

## 📁 Key Files

| File | Purpose |
|------|---------|
| `package.json` | Project dependencies |
| `.env.local` | Environment variables |
| `tsconfig.json` | TypeScript configuration |
| `tailwind.config.ts` | Styling configuration |
| `next.config.js` | Next.js configuration |

## 📂 Important Folders

| Folder | Content |
|--------|---------|
| `app/` | Application pages & API routes |
| `components/` | React components |
| `lib/` | Utilities & helpers |
| `models/` | MongoDB schemas |

## 🎨 Common Tasks

### Change Branding Colors
Edit `tailwind.config.ts`:
```typescript
primary: {
  600: '#3b82f6',  // Change this color
}
```

### Add New Page
1. Create file in `app/` directory
2. Next.js auto-routes it
3. Example: `app/products/page.tsx`

### Add New API Endpoint
1. Create file in `app/api/` directory
2. Export GET/POST/PUT/DELETE functions
3. Example: `app/api/gifts/route.ts`

## 🔧 Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Seed database
npx ts-node lib/seed.ts
```

## 📊 Database Models

| Model | Purpose |
|-------|---------|
| Company | Company profiles |
| User | User accounts & roles |
| Gift | Gift catalog items |
| Campaign | Gifting campaigns |
| Recipient | Recipient information |
| Order | Order management |

## 🌐 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/register` | POST | Register user |
| `/api/auth/login` | POST | Login user |
| `/api/gifts` | GET | Get all gifts |
| `/api/campaigns` | GET/POST | Campaigns |
| `/api/recipients` | GET/POST | Recipients |
| `/api/orders` | GET/POST | Orders |

## 📱 Pages Structure

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing page |
| Login | `/auth/login` | User login |
| Register | `/auth/register` | User registration |
| Dashboard | `/dashboard` | Main dashboard |
| Gifts | `/gifts` | Gift catalog |
| Campaigns | `/campaigns` | Campaigns |
| Recipients | `/recipients` | Recipients |
| Orders | `/orders` | Orders |
| Admin | `/admin` | Admin panel |
| Reports | `/reports` | Reports |

## 🎨 Tailwind Colors

```typescript
primary:   #3b82f6 (Blue)
success:   #22c55e (Green)
warning:   #f59e0b (Orange)
danger:    #ef4444 (Red)
secondary: #64748b (Gray)
```

## 📱 Responsive Breakpoints

```typescript
sm:  640px
md:  768px
lg:  1024px
xl:  1280px
2xl: 1536px
```

## 🔐 Environment Variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `MONGODB_URI` | ✅ | MongoDB connection |
| `NEXTAUTH_SECRET` | ✅ | JWT secret |
| `NEXTAUTH_URL` | ⚠️ | App URL |

## 📚 Documentation

| File | Description |
|------|-------------|
| `START_HERE.md` | Quick start guide |
| `README.md` | Main documentation |
| `SUMMARY.md` | Complete overview |
| `SETUP_GUIDE.md` | Detailed setup |
| `QUICK_REFERENCE.md` | This file |

## 🛠️ Troubleshooting

### Port Already in Use
```bash
# Find process
netstat -ano | findstr :3000
# Kill process
taskkill /PID <PID> /F
```

### Dependencies Error
```bash
npm cache clean --force
rm -rf node_modules
npm install
```

### MongoDB Connection
- Ensure MongoDB is running
- Check `.env.local` settings
- Verify connection string

## 🚢 Deployment

### Vercel
1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

### MongoDB Atlas
1. Create free cluster
2. Get connection string
3. Update `.env.local`
4. Update IP access list

---

**For more details, see:** `START_HERE.md`
