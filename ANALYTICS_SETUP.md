Analytics setup (GTM, GA4, Microsoft Clarity, Google site verification)

Env vars (frontend):
- NEXT_PUBLIC_GTM_CONTAINER_ID: Google Tag Manager container ID (current tag: GTM-WM9HRJVV)
- NEXT_PUBLIC_MS_CLARITY_ID: Microsoft Clarity project ID (e.g. abcd1234)
- NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION: Google Search Console verification token (string)

Where to set:
- Vercel: Project Settings → Environment Variables
- Railway / Heroku / Netlify: Project / Service settings → Environment variables
- Local dev: create `.env.local` in `Dholera-frontend` with the variables above and restart `next` dev server

Example `.env.local`:

NEXT_PUBLIC_GTM_CONTAINER_ID=GTM-WM9HRJVV
NEXT_PUBLIC_MS_CLARITY_ID=abcd1234
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=xxxxxxxxxxxxxxxxxxxx

Verification & smoke checks:
- Deploy or run locally and open site; check page `<head>` for `meta[name="google-site-verification"]`.
- In browser devtools Network tab, look for `gtm.js?id=GTM-WM9HRJVV` and `clarity.ms/tag/` requests.
- Use GA/Clarity dashboards to confirm events/sessions arrive after some traffic.
- For GTM, confirm `ns.html?id=GTM-WM9HRJVV` is present in the page source/network.

Privacy notes:
- These are public-facing client keys (GA/Clarity); do not store sensitive secrets in the frontend repo.
- Consider adding a cookie-consent mechanism before enabling tracking in regions that require consent.
- If you need EEA consent mode, the GA snippet should be extended before or alongside the config call.
- The site now defaults analytics consent to denied, loads GTM, and shows a banner with Accept/Reject choices. GTM should be configured to fire the GA4 tag inside the GTM dashboard.

If you want, I can add a short consent banner component and wire it to conditionally initialize GA/Clarity.