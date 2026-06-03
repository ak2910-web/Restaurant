# 🚀 Vercel Deployment Guide - La Bella Cucina

## Pre-Deployment Checklist

✅ **Dependencies** - All installed and working  
✅ **Build Test** - Build succeeds locally  
✅ **Code** - No errors or warnings  
✅ **Environment** - Ready for production  

---

## Option 1: Deploy via GitHub (Recommended)

### Step 1: Push to GitHub
```bash
cd c:\Users\Amit2\Desktop\flavours\Restaurant
git add .
git commit -m "Ready for Vercel deployment - La Bella Cucina website"
git push origin main
```

### Step 2: Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub account (or create free account)
3. Click **"Add New..."** → **"Project"**
4. Select the **Restaurant** repository
5. Click **"Import"**

### Step 3: Configure Project
- **Project Name**: `la-bella-cucina` (or your choice)
- **Framework**: React (auto-detected)
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build` (auto-filled)
- **Output Directory**: `build` (auto-filled)
- **Install Command**: `npm install` (auto-filled)
- **Environment Variables**: Leave blank (none needed)

### Step 4: Deploy
- Click **"Deploy"**
- Wait for build to complete (2-3 minutes)
- Get your live URL! 🎉

---

## Option 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```

### Step 3: Deploy
```bash
cd c:\Users\Amit2\Desktop\flavours\Restaurant
vercel
```

### Step 4: Follow Prompts
- Set project name: `la-bella-cucina`
- Select scope: Your account
- Link to existing project: No
- Build command: Use defaults
- Output directory: Use defaults
- Deploy: Yes

---

## Option 3: Deploy via Vercel UI (Drag & Drop)

### Step 1: Build Locally
```bash
cd c:\Users\Amit2\Desktop\flavours\Restaurant
npm run build
```

### Step 2: Upload
1. Go to [vercel.com/import](https://vercel.com/import)
2. Upload the `build` folder
3. Done! Get your URL

---

## Post-Deployment

### Verify Deployment
- ✅ Visit your Vercel URL
- ✅ Test all navigation links
- ✅ Test menu tabs switching
- ✅ Test countdown timer
- ✅ Test reservation form
- ✅ Test mobile responsiveness

### Custom Domain (Optional)
1. In Vercel dashboard, go to project settings
2. Navigate to **Domains**
3. Add your custom domain (e.g., `labellacucina.in`)
4. Follow DNS configuration instructions

### Monitoring
- Vercel dashboard shows real-time analytics
- Monitor build times and deployment history
- Set up email notifications for deployments

---

## Automatic Deployments

After connecting GitHub:
- **Main branch** automatically deploys to production
- **Other branches** get preview URLs
- **Pull requests** show preview deployments
- Rollback to previous deployments anytime

---

## Environment Variables (If Needed Later)

To add environment variables:
1. Go to project settings in Vercel
2. Navigate to **Environment Variables**
3. Add any `.env` variables
4. Redeploy

---

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in package.json
- Run `npm install` locally to verify

### Blank Page
- Check browser console for errors
- Verify public/index.html is correct
- Check for relative path issues

### Static Assets Not Loading
- Verify `public/` folder exists
- Check Tailwind CDN link in index.html
- Clear Vercel cache and redeploy

### Cache Issues
- Go to project settings → **Deployments**
- Click three dots on deployment
- Select **Redeploy**

---

## Performance Tips

1. **Optimize Images** (if you add them later)
   - Use next/image component
   - Compress before upload

2. **Minify Code** (automatic with build)
   - React production build handles this

3. **Enable Caching** (configured in vercel.json)
   - Static files cached for 1 year
   - HTML cached for 1 hour

4. **Monitor Analytics**
   - Use Vercel Analytics dashboard
   - Track page performance

---

## Next Steps After Deployment

1. **Add Analytics** - Vercel Web Analytics (free tier available)
2. **Set Up Email** - Use form with email service
3. **Add SEO** - Update meta tags in public/index.html
4. **Social Preview** - Customize OG images
5. **Monitor Traffic** - Check Vercel dashboard

---

## Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **React Documentation**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Vercel Support**: support@vercel.com

---

## Your Live Website URLs

After deployment, you'll get:
- **Production URL**: `https://la-bella-cucina-XXXXX.vercel.app`
- **Custom Domain**: `https://yourdomain.com` (optional)
- **Analytics**: Available in Vercel dashboard
- **Deployments**: All visible in git history

---

## Rollback (If Needed)

To revert to previous deployment:
1. Go to Vercel dashboard
2. Select project
3. Go to **Deployments** tab
4. Find previous deployment
5. Click **Promote to Production**

---

## Quick Reference

| Task | Command |
|------|---------|
| Build locally | `npm run build` |
| Test build | `npm start` |
| Deploy CLI | `vercel` |
| View logs | Check Vercel dashboard |
| Custom domain | Vercel dashboard → Domains |
| Environment vars | Vercel dashboard → Settings |
| Redeploy | Vercel dashboard → Redeploy |

---

## Success! 🎉

Your **La Bella Cucina** website is now live on Vercel!

Share your URL with the world 🍝✨
