# 🚀 Full-Stack Deployment Guide - La Bella Cucina

Complete guide for deploying the full stack (Frontend + Backend + Database) to production.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        VERCEL (Frontend)                     │
│              React Website (la-bella-cucina.com)            │
│                  Auto-deploys on git push                   │
└─────────────────────┬───────────────────────────────────────┘
                      │ API Calls
                      ↓
┌─────────────────────────────────────────────────────────────┐
│                   HEROKU (Backend API)                       │
│              Node.js/Express Server (port 5000)            │
│            Handles reservations, menu, testimonials         │
└─────────────────────┬───────────────────────────────────────┘
                      │ Database Queries
                      ↓
┌─────────────────────────────────────────────────────────────┐
│              MONGODB ATLAS (Database - Cloud)                │
│                   Production Database                       │
│                 Automatic backups & scaling                │
└─────────────────────────────────────────────────────────────┘
```

---

## 📊 Deployment Checklist

### Frontend (React on Vercel)
- [x] Build succeeds locally
- [x] No console errors
- [x] Environment variables configured
- [ ] Deploy to Vercel
- [ ] Configure custom domain
- [ ] Enable analytics

### Backend (Node.js on Heroku)
- [x] All dependencies installed
- [x] Server code ready
- [x] API endpoints tested locally
- [ ] MongoDB Atlas cluster created
- [ ] Deploy to Heroku
- [ ] Configure environment variables
- [ ] Verify database connection

### Database (MongoDB Atlas)
- [ ] Create free account
- [ ] Create cluster
- [ ] Create database user
- [ ] Whitelist IPs
- [ ] Get connection string

---

## 🌐 Step 1: Deploy Database (MongoDB Atlas)

### Create Account
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Sign Up"
3. Complete registration
4. Verify email

### Create Cluster
1. Click "Build a Database"
2. Choose **M0 FREE** tier (free forever)
3. Select region closest to your users
4. Click "Create Cluster"
5. Wait 5-10 minutes for cluster to initialize

### Create Database User
1. Go to **Security** → **Database Access**
2. Click **"Add New Database User"**
3. Username: `restaurant_user`
4. Password: Generate strong password (save it!)
5. Set permissions: Read/Write to any database
6. Click "Create User"

### Whitelist IPs
1. Go to **Security** → **Network Access**
2. Click **"Add IP Address"**
3. Select **"Allow access from anywhere"** (or specific Heroku IPs)
4. Click "Confirm"

### Get Connection String
1. Go to **Databases**
2. Click "Connect"
3. Choose "Drivers"
4. Select Node.js
5. Copy connection string
6. Replace `<password>` with your database user password
7. Replace `<database_name>` with `la-bella-cucina`

Example:
```
mongodb+srv://restaurant_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/la-bella-cucina?retryWrites=true&w=majority
```

---

## 🔧 Step 2: Deploy Backend (Heroku)

### Create Heroku Account
1. Go to [heroku.com](https://www.heroku.com)
2. Click "Sign Up"
3. Complete registration
4. Verify email

### Install Heroku CLI

**Windows:**
```bash
# Download installer from https://devcenter.heroku.com/articles/heroku-cli
# Or use Chocolatey:
choco install heroku-cli
```

**macOS:**
```bash
brew tap heroku/brew && brew install heroku
```

**Linux:**
```bash
curl https://cli-assets.heroku.com/install.sh | sh
```

### Login to Heroku
```bash
heroku login
# Opens browser for authentication
```

### Create Heroku App
```bash
cd c:\Users\Amit2\Desktop\flavours\Restaurant

# Create app
heroku create la-bella-cucina-api

# Or specify name
heroku create your-custom-api-name
```

### Configure Environment Variables
```bash
# Set MongoDB connection string
heroku config:set MONGODB_URI="mongodb+srv://restaurant_user:PASSWORD@cluster0.xxxxx.mongodb.net/la-bella-cucina?retryWrites=true&w=majority"

# Set other variables
heroku config:set JWT_SECRET="your-super-secret-key"
heroku config:set NODE_ENV="production"
heroku config:set FRONTEND_URL="https://yourdomain.vercel.app"

# View all config
heroku config
```

### Deploy Backend
```bash
# Initialize git (if not done)
git init

# Add Heroku remote
heroku git:remote -a la-bella-cucina-api

# Commit changes
git add .
git commit -m "Deploy to Heroku"

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

### Verify Backend is Running
```bash
# Get app URL
heroku apps:info

# Test health endpoint
curl https://your-app-name.herokuapp.com/api/health
```

---

## 🎨 Step 3: Deploy Frontend (Vercel)

### Update Environment Variables

Create `.env.production` in project root:
```env
REACT_APP_API_URL=https://your-heroku-app-name.herokuapp.com/api
```

### Push to GitHub
```bash
git add .
git commit -m "Ready for production deployment"
git push origin main
```

### Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Import Project"
4. Select your repository
5. Set environment variable:
   - `REACT_APP_API_URL` = Your Heroku backend URL
6. Click "Deploy"
7. Wait for deployment (2-3 minutes)
8. Get production URL: `https://your-app.vercel.app`

### Verify Frontend is Running
- Visit your Vercel URL
- Test all features
- Check browser console for errors

---

## 🔗 Step 4: Connect Frontend to Backend

### Update Heroku CORS
```bash
# Set production frontend URL
heroku config:set PRODUCTION_FRONTEND_URL="https://your-app.vercel.app"
```

### Test API Connection
1. Open your Vercel URL
2. Open browser DevTools (F12)
3. Go to Network tab
4. Make a reservation
5. Check API call to backend succeeds

---

## 🌍 Step 5: Add Custom Domain

### Option 1: Custom Domain on Vercel (Domain Required)

1. In Vercel dashboard, go to **Settings** → **Domains**
2. Enter your domain (e.g., `labellacucina.in`)
3. Follow DNS configuration instructions
4. Wait for SSL certificate (5-10 minutes)

### Option 2: Use Free Subdomain
- Vercel provides: `your-app.vercel.app` (free, no domain needed)

---

## 📊 Step 6: Monitoring & Maintenance

### Monitor Backend (Heroku)
```bash
# View logs
heroku logs --tail

# Restart app
heroku restart

# Scale dynos
heroku ps:scale web=1

# Connect to database
heroku run mongosh
```

### Monitor Frontend (Vercel)
- Dashboard shows real-time analytics
- Monitor build times
- Check error logs

### Monitor Database (MongoDB Atlas)
1. Go to MongoDB Atlas dashboard
2. Check cluster status
3. Monitor database size
4. Review backup history

---

## 🔄 Auto-Deployment Pipeline

### Backend (Heroku)
```
git push heroku main
        ↓
Heroku receives code
        ↓
npm install
        ↓
npm start
        ↓
✅ Auto-deployed!
```

### Frontend (Vercel)
```
git push origin main
        ↓
GitHub webhook to Vercel
        ↓
npm install
        ↓
npm run build
        ↓
✅ Auto-deployed!
```

### Update Process
1. Make code changes locally
2. Test thoroughly
3. `git push origin main` (Frontend)
4. `git push heroku main` (Backend)
5. Deployments automatic (2-3 min)

---

## 💰 Cost Breakdown

| Service | Tier | Cost |
|---------|------|------|
| MongoDB Atlas | Free M0 | **$0/month** |
| Heroku | Free tier | **$0/month** (limited) |
| Vercel | Free tier | **$0/month** |
| Custom Domain | .in domain | ~₹300-500/year |
| **Total** | | **~$0-50/year** |

**Note**: Free tiers have limits. Upgrade if you exceed:
- MongoDB: 512MB storage
- Heroku: 550 free dyno hours/month
- Vercel: Unlimited bandwidth

---

## 🚨 Troubleshooting

### Backend not responding
```bash
# Check backend logs
heroku logs --tail

# Restart backend
heroku restart

# Check database connection
heroku run mongosh
```

### Frontend showing errors
1. Check browser console (F12)
2. Check if API URL is correct
3. Verify backend is running
4. Check Network tab in DevTools

### Database connection failed
- Verify MongoDB connection string in Heroku config
- Check IP whitelist in MongoDB Atlas
- Ensure database user password is correct

### CORS errors
- Update `PRODUCTION_FRONTEND_URL` in Heroku config
- Restart backend: `heroku restart`

### Deployment stuck
```bash
# View full logs
heroku logs --tail -p web

# Redeploy
git push heroku main --force
```

---

## 📋 Post-Deployment Checklist

- [ ] Frontend accessible at Vercel URL
- [ ] Backend running at Heroku URL
- [ ] Database connected to backend
- [ ] All API endpoints working
- [ ] Reservations save to database
- [ ] Menu displays from database
- [ ] Testimonials load from database
- [ ] Contact form sends data
- [ ] HTTPS/SSL working
- [ ] Custom domain configured (optional)
- [ ] Monitoring setup
- [ ] Backups configured
- [ ] Team added to services

---

## 🔐 Security Checklist

- [x] Environment variables not committed to git
- [x] Database passwords not exposed
- [x] CORS properly configured
- [x] Input validation on backend
- [x] HTTPS enabled everywhere
- [ ] Rate limiting configured
- [ ] Add authentication for admin features
- [ ] Regular backups enabled
- [ ] Monitor for suspicious activity

---

## 📞 Support

### Vercel Support
- Docs: https://vercel.com/docs
- Status: https://vercel.com/status

### Heroku Support
- Docs: https://devcenter.heroku.com
- Status: https://status.heroku.com

### MongoDB Support
- Docs: https://docs.mongodb.com
- Status: https://status.mongodb.com

---

## 🎉 Live URLs

After deployment, share these:
- **Website**: `https://your-app.vercel.app`
- **API**: `https://your-api.herokuapp.com`
- **Admin**: `https://your-api.herokuapp.com/admin`

---

## 📈 Next Steps

1. Add email notifications for reservations
2. Add admin dashboard for management
3. Add payment integration (if needed)
4. Add real images
5. Add SEO optimization
6. Add analytics
7. Add A/B testing
8. Scale to production tier

---

**Congratulations! Your full-stack application is live! 🎉🚀🍝**
