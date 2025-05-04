# IFA Translator

IFA Translator is a multilingual translation application built on Next.js, designed to provide efficient and accurate real-time translation services across multiple languages. This project uses a modern frontend technology stack to deliver a smooth user experience and high-quality translation functionality.

## Features

- Support for real-time translation between multiple languages
- Responsive design, adapting to various device screens
- Clean and intuitive user interface
- Efficient translation processing engine
- History saving functionality

## Getting Started

First, install dependencies and run the development server:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Technology Stack

- [Next.js 15](https://nextjs.org/) - React framework providing server-side rendering and routing functionality
- [Chakra UI](https://chakra-ui.com/) - Component library offering beautiful and easy-to-use UI components
- [TypeScript](https://www.typescriptlang.org/) - Static type checking to improve code quality and development efficiency
- [React 19](https://react.dev/) - User interface building library
- [Emotion](https://emotion.sh/) - CSS-in-JS solution

## Project Structure

- `/src/app`- Page-level routing, used to routes in the app
- `src/app/page-name`- Used for page routing src/app/module- components used in page
- `src/app/validation`- Form validation logic (e.g, schemas, validators) src/app/lib/api-API route handlers
- `src/app/context` - Context providers for global state public- Used to store the project image and logo
- `.env`-used to store project environment variable, project team member required to copy from create .env file in project root folder and paste the environment variable to .env file before npm

## Deployment

This project can be deployed to any environment that supports Node.js, with Vercel recommended for deployment:

```bash
npm run build
npm run start
```

## Contribution Guidelines

PRs and Issues are welcome to improve this project. Please follow these standards when submitting PRs:

1. PR title format: `[prefix]: [task name]`
2. Commit message format:

```
[prefix]: [task name]

[task description]

Resolve [ticket-number]
```

## Development Team

JR 24 IFA
