/**
 * src/app/page.tsx
 * Root Path Redirect Component
 *
 * This page component handles access requests to the application's root path "/".
 * When a user visits the root path, they will be automatically redirected to the main page "/home",
 * which is the entry point for the IFA Translator application.
 */

import { redirect } from "next/navigation";

/**
 * Root Path Page Component
 * Automatically redirects to the main page when the root path is accessed
 * @returns null - This return value will never be rendered due to the redirect
 */
export default function RootPage() {
  redirect("/signup");

  // This return value will never be rendered because of the redirect
  return null;
}
