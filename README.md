Game Lab Riichi is a mobile-first Riichi Mahjong score tracker.

## Data architecture

The application uses **Supabase Postgres** as its hosted database and **Prisma** as its type-safe ORM and migration tool. MongoDB and Supabase Auth are intentionally not used.

Profiles are public, selectable identities with generated UUIDs and unique names. There is no login, so profiles should not be treated as private accounts. Add authentication or a profile PIN before using this model for sensitive data.

## Database setup

1. Create a Supabase project and copy its pooled connection string into `DATABASE_URL`.
2. Copy the direct database connection string into `DIRECT_URL` for migrations.
3. Copy `.env.example` to `.env` and fill in both values.
4. Run `npm run db:generate` and `npm run db:migrate`.

### Netlify deployment

Add these environment variables in the Netlify site's environment settings for
the Production deploy context:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

Use the values from the Supabase project settings. Netlify should use the
repository root as its base directory and `npm run build` as its build command.
After adding or changing variables, trigger a new deploy with the build cache
cleared.

The Prisma schema stores profiles, games, raw scores, placements, and calculated adjustments. Game submission recalculates scores on the server and writes the game and its player results in one transaction.

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
