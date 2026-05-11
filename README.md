# Dholera Growth Evidence Platform (Frontend)

This is the standalone React frontend for the Dholera project.

## 🏗️ Tech Stack
- **Framework:** React + Vite
- **UI:** Material UI (MUI)
- **Styling:** Vanilla CSS + Emotion
- **Routing:** React Router DOM
- **PWA:** Vite Plugin PWA
- **State:** Context API (Auth, Language)

## 📂 Structure
```text
dholera-frontend/
├── public/             # Static assets (Favicons, Robots.txt, Manifest)
├── src/                # Source code
│   ├── api/            # API client (Axios configuration)
│   ├── components/     # UI components (Common, Layouts, Features)
│   ├── context/        # Global state providers
│   ├── data/           # Static content & site data
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Full page layouts (Public & Admin)
│   ├── theme/          # MUI theme & styles
│   ├── utils/          # Helper functions
│   ├── App.jsx         # App router & layout entry
│   └── main.jsx        # React DOM entry
├── package.json        # Dependencies & scripts
└── vite.config.js      # Vite & PWA configuration
```

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create a `.env` file based on `.env.example` or use the following:
```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_WHATSAPP_NUMBER=919999999999
```

### 3. Run Development Server
```bash
npm run dev
```
The UI will be available at `http://localhost:5173`.

## 📜 Key Scripts
- `npm run build`: Generate a production build in the `dist/` folder.
- `npm run preview`: Preview the production build locally.
- `npm run sitemap`: Generate a dynamic `sitemap.xml`.

## 📱 APK Generation
This frontend is pre-configured for **Capacitor**.
1. `npm install @capacitor/core @capacitor/cli @capacitor/android`
2. `npx cap init DholeraApp com.dholera.app --web-dir dist`
3. `npm run build`
4. `npx cap add android`
5. `npx cap sync android`
6. `npx cap open android` (Opens in Android Studio)

---

## 🗺️ Frontend Roadmap
- [ ] **Multilingual Completion:** Complete Gujarati and Hindi translations for all UI components.
- [ ] **Interactive Maps:** Implementation of GIS/Leaflet for dynamic map exploration.
- [ ] **Search & Filtering:** Global search across development updates and maps.
- [ ] **SEO Prerendering:** Integration of `react-snap` or Vite-SSG for better indexing.
- [ ] **Skeleton Screens:** Enhance all lazy-loaded components with polish.
- [ ] **CI/CD Build:** Automated build and Vercel/Railway deployment hooks.

## ✅ Final Clean Status
- Removed redundant `.codex` folder.
- Removed legacy `pdf/` folder containing non-source assets.
- Consolidated README content.
