<h1 align="center">
  <p>PetPals 🐾</p>
</h1>

![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![CockroachDb](https://img.shields.io/badge/Cockroach%20Labs-6933FF?style=for-the-badge&logo=Cockroach%20Labs&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](	https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

PetPals is a unique app designed for dog owners who want to set playdates with other dog enthusiasts in their area. This app allows users to connect, share information about their dogs, and schedule meetings in dog-friendly locations. Whether you're looking for a play partner for your dog or a social opportunity for yourself, PetPals makes it easy and fun!

Key Features:
- Landing Page, About Me page
- CockroachDB PostgreSQL database
- Real-time messaging using Pusher
- Google & Discord authentication integration with NextAuth
- Client form validation and handling using react-hook-form
- Matching with other profiles based, creating match conversations
- Delete Conversation Functionality (unmatch)
- User profile customization and settings
- Full responsiveness with Tailwind
- Tailwind animations and transition effects
- File and image upload using UploadThing & Cloudinary CDN

## Tech

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)
- [Pusher](https://pusher.com/)
- [Cloudinary](https://cloudinary.com/)
- [Uploadthing](https://uploadthing.com/)
-

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.


## Roadmap

- [x] Swiping Functionality
- [x] Chatroom functionality
- [ ] Credential authentication with NextAuth. (In-progress, Need to connect account creation with Prisma Account Model )
- [ ] Notifications (Need to update Prisma model)
- [x] Chatroom Mobile Responsiveness
- [ ] Migrate UploadThing functionality to Cloudinary CDN
- [ ] Testing
- [ ] Extending Pusher functionality for 'real time' updates
    - [ ] Online/offline user status
    - [ ] Message read/seen receipts (In-progress, currently encountering Pusher errors)
- [ ] Group chat functionality

### Prerequisites

**Node version 14.x**

### Cloning the repository

```shell
git clone https://github.com/AntonioErdeljac/next13-messenger.git
```

### Install packages

```shell
npm i
```

### Setup .env file


```js
DATABASE_URL=

NEXTAUTH_SECRET=
NEXTAUTH_URL=

# Next Auth Discord Provider
DISCORD_CLIENT_ID=
DISCORD_CLIENT_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=

NEXT_PUBLIC_PUSHER_APP_KEY=
PUSHER_APP_ID=
PUSHER_SECRET=

```

### Setup Prisma

```shell
npx prisma db push

```

### Start the app

```shell
npm run dev
```
