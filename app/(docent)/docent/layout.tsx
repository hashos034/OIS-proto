"use client";

import { usePathname } from "next/navigation";
import DocentTopBar from "@/components/docent/DocentTopBar";
import DocentSidebar from "@/components/docent/DocentSidebar";

interface DocentLayoutProps {
  children: React.ReactNode;
}

/** Routes that render without the sidebar/topbar shell (login screens, etc.) */
const BARE_ROUTES = [
  "/docent",
  "/docent/wachtwoord-vergeten",
  "/docent/uu-app",
];

function extractCourseId(pathname: string): string | undefined {
  const match = pathname.match(/\/cursus\/([^/]+)/);
  return match ? match[1] : undefined;
}

export default function DocentLayout({ children }: DocentLayoutProps) {
  const pathname = usePathname();

  // Render bare layout for login / unauthenticated screens
  if (BARE_ROUTES.includes(pathname)) {
    return (
      <div className="min-h-screen bg-uu-surface">
        {children}
      </div>
    );
  }

  const activeCourseId = extractCourseId(pathname);

  return (
    <div className="min-h-screen flex flex-col bg-uu-surface">
      <DocentTopBar />
      <div className="flex flex-1 overflow-hidden">
        <DocentSidebar activeCourseId={activeCourseId} />
        <main className="flex-1 p-6 overflow-y-auto" id="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}
