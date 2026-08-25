import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { DecisionLog } from "../components/decision-log";

const tabs = [
  { to: "/", label: "Executive" },
  { to: "/journey", label: "Journey" },
  { to: "/roadmap", label: "Roadmap Decision Engine" },
  { to: "/data-confidence", label: "Data Confidence" },
  { to: "/donor-impact", label: "Donor / Impact" },
] as const;

function NotFoundComponent() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-5xl">404</h1>
        <p className="mt-3 text-sm text-muted-foreground">This page doesn't exist.</p>
        <Link to="/" className="mt-6 inline-block label-caps text-primary">
          Back to Executive
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-2xl">This page didn't load</h1>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="mt-6 rounded-sm bg-primary px-4 py-2 text-sm text-primary-foreground"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Myna Product Decision & Impact System" },
      {
        name: "description",
        content:
          "A product decision system connecting field reality, donor commitments, engineering constraints, measurement and privacy.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [logOpen, setLogOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-40 border-b border-border bg-background">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4 md:px-12">
            <div>
              <p className="label-caps text-primary">Myna Mahila Foundation</p>
              <p className="text-lg font-semibold leading-tight tracking-tight">
                Product Decision &amp; Impact System
              </p>
            </div>
            <button
              onClick={() => setLogOpen(true)}
              className="rounded-sm border border-border px-3 py-1.5 label-caps text-muted-foreground transition-colors hover:bg-secondary"
            >
              Decision Log
            </button>
          </div>
          <nav className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 md:px-10">
            {tabs.map((t) => (
              <Link
                key={t.to}
                to={t.to}
                activeOptions={{ exact: t.to === "/" }}
                className="whitespace-nowrap border-b-2 border-transparent px-3 py-3 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground data-[status=active]:border-primary data-[status=active]:text-foreground"
              >
                {t.label}
              </Link>
            ))}
          </nav>
        </header>

        <main>
          <Outlet />
        </main>

        <footer className="border-t border-border bg-surface">
          <div className="mx-auto max-w-7xl px-6 py-12 md:px-12">
            <p className="label-caps text-muted-foreground">Prototype status</p>
            <p className="mt-2 max-w-2xl text-xl font-medium tracking-tight">
              Strategic framework — not connected to Myna production data.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Field reality + donor reality + engineering reality + product strategy + measurement +
              privacy = better product decisions.
            </p>
          </div>
        </footer>
      </div>
      {logOpen ? <DecisionLog onClose={() => setLogOpen(false)} /> : null}
    </QueryClientProvider>
  );
}
