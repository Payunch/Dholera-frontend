# Dholera Growth Evidence Platform – Web Frontend

## Executive Summary

The **Dholera Frontend** is a React-based web application that serves as the public-facing portal for the Dholera Growth platform. It provides comprehensive project information, lead interaction, document browsing, and administrative dashboards—optimized for desktop, tablet, and mobile viewing.

**Current Status:**
- ✅ Production-ready React application with Vite build optimization
- ✅ Fully functional admin dashboard and public information portal
- ✅ PWA-enabled for offline access and app-like experience
- ✅ Multilingual support (English, Gujarati, Hindi)
- ⚠️ Backend API connection required for live data
- ⚠️ SEO prerendering pending for search indexing

---

## Platform Architecture

### Core Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|----------|
| **Framework** | React 18.3 + Vite 7 | Fast, modern UI development |
| **UI Library** | Material UI (MUI) 7 | Professional component library |
| **Styling** | Emotion + CSS | Theme management and responsive design |
| **Routing** | React Router DOM 6 | Client-side page navigation |
| **State Mgmt** | Context API | Global auth and language state |
| **HTTP Client** | Axios | API communication with backend |
| **PWA** | Vite PWA Plugin | Offline capability and app installation |
| **Deployment** | Node.js Server | Express-based static hosting |

### Key Capabilities

1. **Public Information Portal**
   - Project overview with progress tracking
   - Infrastructure updates and news feed
   - Interactive project maps and galleries
   - Document downloads (Nakshas, brochures)

2. **Lead Interaction**
   - Inquiry form submission
   - Callback request functionality
   - WhatsApp integration for direct contact

3. **Administrative Dashboard**
   - Lead management and tracking
   - Update publishing interface
   - Analytics and engagement metrics
   - User access management

4. **Responsive Design**
   - Optimized for desktop (1920px+)
   - Tablet layouts (768px - 1024px)
   - Mobile-first design (320px+)
   - Touch-friendly interface

5. **Internationalization**
   - English (default)
   - Gujarati (native market)
   - Hindi (cross-regional)
   - Context-based language switching

---

## Development & Deployment

### Setup Instructions

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env
```

### Environment Configuration

Create `.env` file with the following variables:

```env
VITE_API_BASE_URL=https://api.dholera.com/api
VITE_WHATSAPP_NUMBER=919999999999
VITE_APP_NAME=Dholera Growth Platform
VITE_APP_DOMAIN=dholera.com
```

### Local Development

```bash
# Start development server (with hot reload)
npm run dev
# Available at: http://localhost:5173

# Build for production
npm run build
# Output: dist/ folder

# Preview production build locally
npm run preview
# Available at: http://localhost:4173
```

### Production Deployment

**Option 1: Node.js Server (Railway/Heroku)**
```bash
npm run build
# Deploy dist/ folder content
# Server should serve index.html for all routes (SPA routing)
```

**Option 2: Vercel (Recommended)**
- Connect GitHub repository
- Vercel auto-detects Vite configuration
- Automatic deployment on push to main
- See `vercel.json` for configuration

**Option 3: Railway (Docker)**
- See `railway.json` for deployment configuration
- Automatic deployment via railway.app dashboard

---

## Project Structure

```
Dholera-frontend/
├── public/                      # Static assets (logos, robots.txt)
├── src/
│   ├── api/
│   │   └── axiosConfig.js       # Axios instance with interceptors
│   ├── components/
│   │   ├── Common/              # Shared UI components
│   │   ├── Layouts/             # Page layouts (Header, Footer, Sidebar)
│   │   └── Features/            # Feature-specific components
│   ├── context/
│   │   ├── AuthContext.jsx      # Authentication state
│   │   └── LanguageContext.jsx  # Language/i18n state
│   ├── data/
│   │   └── siteData.js          # Static content and configuration
│   ├── hooks/
│   │   ├── useAuth.js           # Auth custom hook
│   │   └── useLanguage.js       # i18n custom hook
│   ├── pages/
│   │   ├── Public/              # Publicly accessible pages
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   └── Documents.jsx
│   │   └── Admin/               # Protected admin pages
│   │       ├── Dashboard.jsx
│   │       └── LeadsMgmt.jsx
│   ├── theme/
│   │   ├── theme.js             # MUI theme configuration
│   │   └── colors.js            # Color palette
│   ├── utils/
│   │   ├── validators.js        # Form validation helpers
│   │   └── formatters.js        # Data formatting utilities
│   ├── App.jsx                  # Main app with routing
│   └── main.jsx                 # React DOM entry
├── package.json
├── vite.config.js               # Vite & PWA config
├── vercel.json                  # Vercel deployment config
└── railway.json                 # Railway deployment config
```

---

## API Integration

The frontend communicates with the **Dholera Backend API** exclusively:

- **Base URL**: Set via `VITE_API_BASE_URL` environment variable
- **Authentication**: JWT token stored in localStorage
- **Request Format**: Standard JSON with CSRF headers
- **Error Handling**: Automatic token refresh and user session management

---

## Build Optimization

### Vite Build Configuration
- Code splitting for lazy-loaded routes
- Tree-shaking for unused imports
- Minification of JS, CSS, and HTML
- Image optimization via plugins

### PWA Features
- Service worker for offline access
- App manifest for installation
- Caching strategy for static assets
- Auto-update notifications

---

## Roadmap & Enhancements

**Q2 2026:**
- [ ] Complete Gujarati and Hindi translations
- [ ] GIS/Leaflet integration for interactive maps
- [ ] Global search across updates and documents

**Q3 2026:**
- [ ] SEO prerendering (Vite-SSG)
- [ ] Enhanced skeleton screens and loading states
- [ ] CI/CD pipeline automation

**Q4 2026:**
- [ ] Advanced analytics dashboard
- [ ] Lead behavior tracking and analytics
- [ ] Email notification system

---

## Operational Requirements

### Development Environment
- Node.js: 18.0 or higher
- npm or yarn package manager
- Modern browser (Chrome 90+, Firefox 88+, Safari 14+)

### Production Hosting
- **Minimum**: 512 MB RAM, 1 vCPU
- **Recommended**: 1–2 GB RAM, 2 vCPU
- **Storage**: 2 GB for builds and logs
- **CDN**: Recommended for static asset delivery

### Performance Targets
- **Page Load**: < 2 seconds on 4G
- **Core Web Vitals**: Green across all metrics
- **Lighthouse**: 90+ score

---

## Support & Documentation

- **Backend API**: See [Dholera-backend README](../Dholera-backend/README.md)
- **Mobile App**: See [dholera (Flutter) README](../dholera/README.md)
- **Deployment Guides**: Railway, Vercel configs included
- **Vite Docs**: https://vitejs.dev
- **React Docs**: https://react.dev
- **MUI Docs**: https://mui.com

---

**Built with React + Vite | Managed by Dholera Product Team | Last Updated: May 2026**

