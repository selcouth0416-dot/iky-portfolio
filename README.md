# Iky Portfolio

Next.js portfolio for Iky with scroll animations, Daily Routine audio player,
GitHub-managed assets, social links, and a server-side Google Gemini AI Assistant.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Add your Gemini key to `.env.local`:

```env
AI_API_KEY=your_gemini_api_key_here
```

## Replace assets through GitHub

You can replace these files without changing the React code:

- `public/assets/profile/profile.jpg` — profile photo
- `public/assets/projects/ai-engineer.jpg` — AI Engineer visual
- `public/assets/projects/truck-driver.jpg` — truck visual
- `public/assets/projects/welding.jpg` — welding visual
- `public/assets/routine/cover.jpg` — Daily Routine cover
- `public/assets/routine/track-1.mp3`
- `public/assets/routine/track-2.mp3`
- `public/assets/routine/track-3.mp3`
- `public/assets/music/background.mp3` — invisible background audio
- `public/assets/cv/iky-cv.pdf` — downloadable CV

For the Daily Routine title/artist/order, edit only:
`public/assets/routine/routine.json`

There is intentionally no upload/change-photo UI.

## Vercel + Gemini

In Vercel:
Project → Settings → Environment Variables

Add:

`AI_API_KEY`

Then redeploy.

Never commit `.env.local`.

## Quality checks

```bash
npm run lint
npx tsc --noEmit
npm run build
```

The AI API key is only used server-side in `app/api/chat/route.ts`.
