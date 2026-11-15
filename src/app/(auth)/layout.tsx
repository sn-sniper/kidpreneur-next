// src/app/(auth)/layout.tsx
// Empty shell — used only by /admin/login so the sidebar never renders.
// The URL is unchanged because "(auth)" is a Next.js route group.
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}