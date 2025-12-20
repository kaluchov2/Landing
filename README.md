# Landing Page - Idea Submission Platform

A beautiful, modern landing page built with Next.js, TypeScript, and Tailwind CSS. Users can share their ideas via a modal form, and you'll receive email notifications through Resend.

## Features

- 🎨 Modern, responsive design with gradient backgrounds and smooth animations
- 📧 Email submission via Resend API
- ✅ Form validation with React Hook Form and Zod
- 🎯 Accessible UI components (shadcn/ui)
- 📱 Mobile-first responsive design

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Resend account (sign up at [resend.com](https://resend.com))

### Installation

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

Update `.env.local` with your credentials:

```env
RESEND_API_KEY=your_resend_api_key_here
YOUR_EMAIL=your-email@example.com
RESEND_FROM_EMAIL=onboarding@resend.dev
```

**Note about RESEND_FROM_EMAIL:**

- For testing, you can use `onboarding@resend.dev` (default)
- For production, verify your domain with Resend and use your verified domain email (e.g., `noreply@yourdomain.com`)

3. Get your Resend API key:
   - Sign up at [resend.com](https://resend.com)
   - Go to API Keys section
   - Create a new API key and copy it to your `.env.local` file

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/
│   ├── api/
│   │   └── submit-idea/
│   │       └── route.ts     # API endpoint for email submission
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Main landing page
│   └── globals.css          # Global styles
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── HeroSection.tsx      # Hero section component
│   └── IdeaSubmissionForm.tsx # Modal form component
└── lib/
    ├── resend.ts            # Resend client configuration
    └── utils.ts             # Utility functions
```

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful UI component library
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Resend** - Email API service

## Future Enhancements

- Projects showcase section
- About me section
- Database integration for idea tracking
- Admin dashboard for managing submissions

## License

MIT
