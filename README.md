This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
 
## Payment integration — local dev notes

If you're testing PhonePe locally, use the backend landing endpoint to keep the payment popup open and communicate the result back to the opener.

- Set `PHONEPE_REDIRECT_URL` in your backend `.env` to:
	`http://localhost:3001/api/payment/landing/:merchantTransactionId`

- Start backend and frontend:
	```bash
	# backend (defaults to 3001 in this project)
	cd Dholera-backend
	npm install
	npm run dev

	# frontend
	cd Dholera-frontend
	npm install
	npm run dev
	```

- Optional env for frontend (when building for production):
	- `NEXT_PUBLIC_FRONTEND_ORIGIN` — the canonical frontend origin (e.g. `https://app.example.com`)
	- `NEXT_PUBLIC_PAYMENT_LANDING_ORIGIN` — if your landing page is hosted on a different origin, set it so the frontend accepts the postMessage.

Reproduce the flow and check the backend logs for the create-order response and the redirect URL. The popup should land on `/api/payment/landing/:merchantTransactionId` and the opener will receive a `postMessage` with `{ type: 'phonepe-payment-success', pdfId, status }`.
DEMO 2: The "Zoning Safety Guardrail" Test (Proving Trust & High Conversions)Show your clients how the system handles complex DSIRDA building rules automatically, stopping users from making illegal, costly plan mistakes before they submit Form C.  How to run it:Scroll down to your newly integrated Clearance Verification Cost Matrix layout.Type 1,500 sq.m into the Total Proposed Built-Up Area input box. Watch the Base Verification Fee calculate instantly to exactly ₹4,500.00 based on the Section 2.2 residential guidelines.Now, input 22 meters into the Maximum Structural Height input box.Watch the State Transition Live: The user interface instantly shifts from a green success state to a bright amber alert banner displaying a critical constraint warning.What to explain to the client: "Our system reads the structural rules from the official Dholera GDCR documents automatically. The moment a user inputs a height above 21 meters, the frontend immediately blocks illegal submissions and alerts them that Section 9.11.1 requires dual structural lift installations. This transforms your website from a simple image gallery into a premium, compliant software utility that users can trust completely."DEMO 3: The "FSI Surcharge Monetization" Toggle (Proving Business Growth)Demonstrate how the system handles premium project configurations to maximize development potential transparently.How to run it:Leave your built-up area set at 1,500 sq.m.Click the checkbox labeled "Request Premium 25% FSI Allocation Upgrade".Watch the pricing summary update interactively. The app applies the official Section 9.1.1 infrastructure calculation script, automatically processing a premium fee of 1,500 * ₹1500 = ₹22,500,00.00.What to explain to the client: "Instead of hiding development costs behind weeks of physical paperwork or surprise administrative fees, our digital portal computes complex premium FSI pricing variables cleanly on the spot. Developers get complete spatial accuracy instantly, making them significantly more likely to sign up, create a profile, and process their applications through your channel."[cite: 4]

          id="google-adsense"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6979634293826789"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script