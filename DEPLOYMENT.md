# Deployment Guide: Frontend on Netlify + Backend on Render

## Overview
- **Frontend**: React app → Netlify (automatic deploys from GitHub)
- **Backend**: Node.js API → Render.com (auto-restart, free tier)

---

## Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ifex-international.git
git push -u origin main
```

---

## Step 2: Deploy Backend to Render.com

### 2.1 Create Render Account
- Go to [render.com](https://render.com)
- Sign up with GitHub

### 2.2 Create Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Fill in:
   - **Name**: `ifex-backend`
   - **Runtime**: Node
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
   - **Branch**: `main`

### 2.3 Set Environment Variables
In Render dashboard, add these environment variables:
```
NODE_ENV = production
PORT = 4000
CLIENT_ORIGIN = https://YOUR_NETLIFY_DOMAIN.netlify.app
ADMIN_PASSWORD = your_secure_password
EMAIL_SERVICE = gmail
EMAIL_USER = your_email@gmail.com
EMAIL_PASS = your_app_password
CONTACT_EMAIL_TO = recipient@example.com
```

### 2.4 Deploy
Click **"Create Web Service"** and wait for deployment. You'll get a URL like:
```
https://ifex-backend-xxx.onrender.com
```

Save this URL.

---

## Step 3: Deploy Frontend to Netlify

### 3.1 Create Netlify Account
- Go to [netlify.com](https://netlify.com)
- Sign up with GitHub

### 3.2 Connect Repository
1. Click **"Add new site"** → **"Import an existing project"**
2. Select GitHub, choose your repository
3. Fill in:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

### 3.3 Set Environment Variables
In Netlify Site Settings → Build & deploy → Environment:
```
VITE_API_URL = https://ifex-backend-xxx.onrender.com/api
```
*(Replace with your actual Render backend URL)*

### 3.4 Deploy
Click **"Deploy site"** and wait. You'll get a URL like:
```
https://your-site-name.netlify.app
```

---

## Step 4: Update Backend CORS

1. Go back to **Render Dashboard**
2. Click your backend service
3. Go to **Environment** settings
4. Update `CLIENT_ORIGIN` with your Netlify domain:
   ```
   CLIENT_ORIGIN = https://your-site-name.netlify.app
   ```

---

## Step 5: Test Live Site

1. Visit `https://your-site-name.netlify.app`
2. Test admin login: Admin → Login
3. Test portfolio/company features
4. Verify API calls work (check browser Network tab)

---

## Troubleshooting

**API calls failing?**
- Check browser console for errors
- Verify `VITE_API_URL` is set in Netlify
- Verify `CLIENT_ORIGIN` is set in Render

**Admin login not working?**
- Check `ADMIN_PASSWORD` matches in Render
- Clear localStorage and try again

**Uploads not saving?**
- Render free tier has ephemeral storage
- Consider using Cloudinary or AWS S3 for file uploads

---

## Free Tier Limits

- **Netlify**: 300 build minutes/month (plenty for small projects)
- **Render**: Web service spins down after 15 min inactivity (first request takes ~30s to wake up)
