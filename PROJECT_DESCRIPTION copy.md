# iFeX International - Project Description

## 📋 Project Overview
**iFeX International** is a modern, full-stack web application for an engineering/software development consulting firm. It showcases services, portfolio work, and provides an admin panel for managing content without touching code.

---

## 🎯 Purpose & Goals
1. **Professional Web Presence**: Showcase expertise in web development, ERP systems, mobile apps, AI, and UI/UX
2. **Portfolio Showcase**: Display client work organized by multiple categories
3. **Admin Content Management**: Allow non-technical staff to:
   - Create/edit/delete portfolio projects with multiple category tags
   - Manage company details (hero text, contact info, social links, mission/vision)
   - Toggle features on/off (e.g., hide Pricing page)
   - Upload project images
4. **Lead Generation**: Contact forms, CTA buttons, clear service descriptions
5. **Professional Branding**: Modern design with smooth animations, gradient UI, dark theme

---

## 🛠 Tech Stack

### Frontend
- **Framework**: React 18 with React Router v6
- **Bundler**: Vite (dev server localhost:5173)
- **Styling**: Tailwind CSS with custom layer definitions in `src/index.css`
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **UI Components**: Custom built (Button, Card, Footer, Navbar, etc.)
- **State Management**: React Context API (ContentContext, AdminAuthContext)

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Port**: localhost:4000
- **Authentication**: bcryptjs password hashing + simple session check
- **File Upload**: Multer for image uploads
- **Validation**: express-validator for input validation
- **Data Persistence**: JSON file (`server/data/content.json`)

### Deployment
- **Frontend**: InfinityFree or Vercel/Netlify
- **Backend**: Render.com (Node.js support)

---

## 🏗 Architecture

### Data Flow
```
Frontend (React) 
  ↓ (HTTP API calls)
Backend (Express)
  ↓ (read/write)
JSON File (server/data/content.json)
```

### State Management
```
App.jsx (main router)
  ├── ContentProvider (provides company, portfolio, refresh function)
  ├── AdminAuthProvider (handles login state)
  └── Routes (conditionally rendered based on pricingVisible flag)
```

### Authentication
- Simple password-based admin login (no database)
- Password stored in env or hardcoded on server
- Current password: `5HM88fq2q97@+`
- Session management via frontend (localStorage token approach could be added)

---

## ✨ Current Features

### Public Features (All Users)
1. **Homepage**: 
   - Hero section with animated globe (Three.js canvas)
   - Services overview with icons and descriptions
   - Tech stack display
   - "Why Choose Us" section with stats
   - Call-to-action buttons

2. **Services Page**: 
   - Grid of 8 core services (Web Dev, ERP, Mobile, AI, UI/UX, Consulting, Training, Support)
   - Filter/category view

3. **Service Detail Pages**: 
   - Dynamic pages for each service
   - Icon, description, features list, metrics
   - CTAs to contact page

4. **Portfolio**: 
   - Gallery of client projects
   - Filter by multiple categories (Websites, ERP, Mobile, AI, UI/UX)
   - Project cards show title, categories, image, description

5. **Portfolio Detail**: 
   - Full project details (title, description, challenge, solution, results)
   - Image display
   - Back navigation

6. **About Page**: 
   - Company mission/vision
   - Team/culture info
   - Contact section

7. **Contact Page**: 
   - Contact form (name, email, message)
   - Company contact details
   - Social media links

8. **Pricing Page** (optional): 
   - Can be hidden/shown via admin toggle
   - Displays pricing tiers

9. **Navigation**:
   - Sticky navbar with smooth scroll
   - Mobile hamburger menu
   - Dynamic links (Pricing link appears/disappears based on pricingVisible flag)

10. **Footer**:
    - Company info
    - Quick links (dynamically filtered)
    - Social media links
    - Copyright

### Admin Features

1. **Admin Login** (`/admin/login`):
   - Password-protected access
   - Session persistence

2. **Portfolio Manager Tab**:
   - **Create Project**: Form to add new portfolio items
     - Title, description, challenge, solution, results, image upload
     - **Multiple Categories**: Checkbox selection (Websites, ERP, Mobile, AI, UI/UX)
     - Image preview before upload
   - **Edit Project**: Modify existing projects
   - **Delete Project**: Remove projects with confirmation
   - **Drag-to-reorder** (if implemented): Reorder projects in portfolio
   - Project list with thumbnails and quick edit/delete buttons

3. **Company Details Tab**:
   - **Homepage Hero**: Edit main headline and subheading
   - **Contact Details**: Edit email, phone, address
   - **Social Links**: Edit social media URLs (LinkedIn, GitHub, Twitter, etc.)
   - **Mission & Vision**: Edit company mission and vision statements
   - **Homepage Stats**: Edit stats displayed on homepage
   - **Pricing Visibility Toggle**: Checkbox to show/hide pricing page from frontend
   - Save button with loading state

4. **Image Upload**:
   - Upload portfolio project images
   - Server stores in `server/uploads/` directory
   - Images served via `/uploads/` static route
   - File size validation

---

## 📦 Data Structure

### Content.json Schema
```javascript
{
  "company": {
    "name": "iFeX International",
    "email": "contact@ifex.com",
    "phone": "+1234567890",
    "address": "City, Country",
    "heroTitle": "...",
    "heroSubtitle": "...",
    "mission": "...",
    "vision": "...",
    "stats": [
      { "value": "50+", "label": "Projects" },
      { "value": "20+", "label": "Team Members" }
    ],
    "socialLinks": {
      "linkedin": "...",
      "github": "...",
      "twitter": "..."
    },
    "pricingVisible": true  // NEW: Controls pricing page visibility
  },
  "portfolio": [
    {
      "id": "uuid",
      "title": "Project Name",
      "description": "...",
      "challenge": "...",
      "solution": "...",
      "results": "...",
      "image": "path/to/image.jpg",
      "categories": ["Websites", "AI"]  // NEW: Multiple categories support
    },
    ...
  ]
}
```

---

## 📁 Project Structure

```
ifex-international-website/
├── index.html                    # Entry HTML file
├── package.json                  # Frontend deps
├── vite.config.js               # Vite config with API proxy
├── tailwind.config.js           # Tailwind theme config
├── postcss.config.js            # PostCSS config
├── README.md
│
├── public/                       # Static assets
│
├── src/
│   ├── main.jsx                 # React entry point
│   ├── App.jsx                  # Main router & conditional routes
│   ├── index.css                # Global styles with Tailwind layers
│   │
│   ├── components/
│   │   ├── ServiceTemplate.jsx  # Reusable detail page template
│   │   ├── Admin/
│   │   │   ├── ProtectedRoute.jsx       # Requires auth wrapper
│   │   │   ├── AdminDashboard.jsx       # Main admin panel with tabs
│   │   │   ├── AdminLogin.jsx           # Login form
│   │   │   ├── PortfolioManager.jsx     # Portfolio CRUD + categories
│   │   │   └── CompanyForm.jsx          # Company details form
│   │   ├── Common/
│   │   │   ├── Navbar.jsx       # Navigation (filters Pricing link)
│   │   │   ├── Footer.jsx       # Footer (filters Pricing link)
│   │   │   ├── Button.jsx       # Reusable button component
│   │   │   ├── ScrollToTop.jsx  # Auto-scroll on route change
│   │   │   └── SectionHeader.jsx # Section title component
│   │   ├── Contact/
│   │   │   ├── ContactForm.jsx  # Contact form submission
│   │   │   └── ContactCard.jsx  # Contact info display
│   │   ├── Home/
│   │   │   ├── Hero.jsx         # Homepage hero section
│   │   │   ├── GlobeCanvas.jsx  # 3D globe animation
│   │   │   ├── ServicesOverview.jsx  # Services grid
│   │   │   ├── TechStack.jsx    # Technology showcase
│   │   │   ├── WhyChooseUs.jsx  # Company differentiators
│   │   │   └── CTA.jsx          # Call-to-action section
│   │
│   ├── pages/
│   │   ├── Home.jsx             # Homepage
│   │   ├── Services.jsx         # Services listing page
│   │   ├── ServiceDetail.jsx    # Individual service page
│   │   ├── Portfolio.jsx        # Portfolio gallery with filters
│   │   ├── PortfolioDetail.jsx  # Individual project detail
│   │   ├── About.jsx            # About page
│   │   ├── Contact.jsx          # Contact page
│   │   ├── Pricing.jsx          # Pricing page
│   │   └── admin/
│   │       ├── AdminLogin.jsx   # Admin login page
│   │       └── AdminDashboard.jsx # Admin panel
│   │
│   ├── context/
│   │   ├── ContentContext.jsx   # Provides company, portfolio, refresh
│   │   └── AdminAuthContext.jsx # Provides isAuthenticated, login, logout
│   │
│   ├── data/
│   │   └── servicesData.js      # Hardcoded services data (8 services)
│   │
│   └── lib/
│       ├── api.js               # All API calls (axios-based)
│       └── iconMap.js           # Icon mapping for Lucide React
│
├── server/
│   ├── server.js                # Express server (main file, ~300 lines)
│   ├── auth.js                  # Password hashing & verification
│   ├── contentStore.js          # JSON file read/write logic
│   ├── package.json             # Backend deps
│   │
│   ├── data/
│   │   └── content.json         # Main data file (company + portfolio)
│   │
│   └── uploads/                 # Portfolio project images
│       └── (generated on upload)
```

---

## 🔌 API Endpoints

### Authentication
- `POST /api/admin/login` - Login with password
- `POST /api/admin/logout` - Logout

### Portfolio (Admin)
- `GET /api/portfolio` - Get all projects
- `POST /api/admin/portfolio` - Create new project
- `PUT /api/admin/portfolio/:id` - Update project (including categories)
- `DELETE /api/admin/portfolio/:id` - Delete project
- `POST /api/admin/portfolio/upload` - Upload image

### Company (Admin)
- `GET /api/company` - Get company details
- `PUT /api/admin/company` - Update company details (including pricingVisible)

### Public
- `GET /uploads/:filename` - Serve uploaded images

---

## 🎨 Design System

### Colors (Tailwind)
- **Primary**: Electric cyan (`from-electric to-cyan`)
- **Dark bg**: `bg-black` / `bg-slate-950`
- **Text**: White, `white/60`, `white/50` for hierarchy
- **Accents**: Cyan, blue, purple gradients

### Components
- **Glass panels**: Frosted glass effect with backdrop blur
- **Rounded corners**: `rounded-2xl` (16px radius)
- **Spacing**: Consistent padding/margin scale
- **Typography**: Bold headings, readable body text with leading

### Animations
- Fade + slide on component mount
- Stagger animations on lists
- Smooth hover transitions
- Scroll-triggered animations (Framer Motion useInView)

---

## 🚀 Recent Improvements (This Session)

1. **Multi-Category Support for Portfolio**:
   - Changed from single category to multiple categories per project
   - Added checkbox UI in admin (Websites, ERP, Mobile, AI, UI/UX)
   - Categories stored as array in JSON
   - Portfolio filter page supports filtering by multiple categories

2. **Pricing Page Visibility Toggle**:
   - Added `pricingVisible` boolean in company settings
   - Admin can toggle "Show Pricing page on the website" checkbox
   - When unchecked:
     - `/pricing` route removed from App.jsx
     - Pricing link hidden from Navbar
     - Pricing link hidden from Footer
   - Fully persists to database (JSON file)

3. **Bug Fixes**:
   - Fixed Footer rendering crash (typo: `footerLinksmap` → `footerLinks`)
   - Fixed pricing toggle not saving (added spread operator for pricingVisible in server update)

4. **UI Improvements**:
   - Increased service icon size and padding for better visibility on service detail pages

---

## 📝 Deployment Notes

### Before Going Live
1. Change admin password (currently `5HM88fq2q97@+`)
2. Update API_BASE_URL in `src/lib/api.js` to production backend URL
3. Update CORS settings in `server/server.js` to allow production domain
4. Consider adding:
   - Email notifications for contact form submissions
   - Analytics (Google Analytics, Hotjar)
   - SEO meta tags
   - Error logging/monitoring
   - Database migration from JSON to MongoDB/PostgreSQL

### Current Limitations
- Single-file JSON data storage (not scalable beyond ~100 projects)
- No email notification system for contact forms
- No image optimization/CDN
- No user role system (only single admin password)
- File uploads stored locally (won't work on serverless platforms)

---

## 🎯 Possible Future Features

1. **Enhanced Admin**:
   - Multiple admin users with different roles
   - Draft/publish workflow for projects
   - Drag-to-reorder portfolio projects
   - SEO title/description editing
   - Blog/news section

2. **Content**:
   - Testimonials/case studies
   - Team member profiles
   - Blog articles
   - FAQ section
   - Webinar registration

3. **E-commerce**:
   - Shopping cart for services
   - Payment integration (Stripe)
   - Invoice generation

4. **Analytics**:
   - Conversion tracking
   - Lead source tracking
   - Form submission analytics

5. **Performance**:
   - Image optimization (WebP, CDN)
   - Database migration to MongoDB
   - Caching strategies
   - File upload to cloud storage (AWS S3, Cloudinary)

---

## 🐛 Known Issues / Technical Debt

1. **No backend database** - Using JSON file, should migrate to MongoDB
2. **File upload local storage** - Won't work on serverless hosts, use cloud storage
3. **Single admin password** - Should implement proper user management
4. **No contact form email notifications** - Forms submit but no email sent
5. **No error handling notifications** - Admin forms don't always show success/error clearly
6. **CORS hardcoded** - Should use environment variables
7. **Portfolio images not optimized** - Could implement lazy loading, WebP format
8. **No refresh token** - Admin session could be more secure

---

## 📞 Contact & Support

For questions about this project architecture or deployment, refer to this document.

---

**Last Updated**: July 6, 2026
**Version**: 1.0 (Multi-category portfolio + Pricing visibility toggle)
