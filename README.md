# Eastay Hostels: landing page

Next.js (App Router) + TypeScript + Tailwind CSS v4 + React Hook Form + Zod + Lucide icons.

## Run

```bash
npm install
cp .env.example .env.local   # then edit values
npm run dev                  # http://localhost:3000
npm run typecheck
npm run build && npm start
```

## Where to edit things

| What | File |
| --- | --- |
| Hostel prices, occupancy, vacancy, photos, **Google Maps** (embed/query/link) | `src/config/hostels.ts` |
| Headline, hero description, hero image, phone / WhatsApp / email | `src/config/site.ts` |
| WhatsApp number | `NEXT_PUBLIC_WHATSAPP_NUMBER` in `.env.local` (digits only, e.g. `919876543210`) |
| Photos | Replace `public/images/hostel-1.svg`, `hostel-2.svg`, `hero.svg` (any JPG/WebP works; update the paths in config) |
| Brand colours | `src/app/globals.css` (`--color-eastay` is the logo green `#038359`) |

### Adding a hostel's map
In `hostels.ts`, set `map.embedSrc` to the `src` of Google Maps > Share > Embed a map, and `map.url` to the normal share link.
(Alternatively set `map.query` to an address or `lat,lng` to embed without an embed URL.) Until then a placeholder is shown.

## Enquiry form and backend

The form (`src/components/enquiry-form.tsx`) only validates and calls `submitEnquiry()` in
`src/lib/enquiry/submit.ts`. **No backend is chosen yet**, so until one is configured the form
reports an error and tells the visitor to use WhatsApp or phone. It never shows a fake success.
In development a visible amber notice also says nothing is being sent.

To connect a backend, either set `NEXT_PUBLIC_ENQUIRY_ENDPOINT` (JSON POST) or add a transport in
`src/lib/enquiry/transports.ts` and return it from `resolveTransport()`. The UI doesn't change.
