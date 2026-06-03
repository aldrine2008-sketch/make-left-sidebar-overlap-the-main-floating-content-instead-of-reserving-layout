import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";
import { Suspense, lazy } from "react";
import RequireAuth from "./components/auth/RequireAuth";
import DashboardLayout from "./components/layout/DashboardLayout";
import SkeletonBlock from "./components/loading/SkeletonBlock";
import UserSettingsBootstrapper from "./components/settings/UserSettingsBootstrapper";
import RouteTransition from "./components/transitions/RouteTransition";

// Lazy load pages
const LandingPage = lazy(() => import("./pages/LandingPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const LandSearchPage = lazy(() => import("./pages/LandSearchPage"));
const LandRecordDetailPage = lazy(() => import("./pages/LandRecordDetailPage"));
const MyApplicationsPage = lazy(
  () => import("./pages/Applications/MyApplicationsPage"),
);
const NewApplicationPage = lazy(
  () => import("./pages/Applications/NewApplicationPage"),
);
const ApplicationDetailPage = lazy(
  () => import("./pages/Applications/ApplicationDetailPage"),
);
const ApplicationsQueuePage = lazy(
  () => import("./pages/Officer/ApplicationsQueuePage"),
);
const ServicesGatewayPage = lazy(() => import("./pages/ServicesGatewayPage"));
const VerificationPage = lazy(() => import("./pages/VerificationPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const MarketTrendDashboardPage = lazy(
  () => import("./pages/MarketTrendDashboardPage"),
);
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const KenyaLandViewPage = lazy(() => import("./pages/KenyaLandViewPage"));
const MessagesPage = lazy(() => import("./pages/MessagesPage"));
const TransactionWorkflowPage = lazy(
  () => import("./pages/TransactionWorkflowPage"),
);

// Right sidebar pages
const MarketplacePage = lazy(
  () => import("./pages/RightSidebar/MarketplacePage"),
);
const MarketAnalyticsPage = lazy(
  () => import("./pages/RightSidebar/MarketAnalyticsPage"),
);
const AIValuationLabPage = lazy(
  () => import("./pages/RightSidebar/AIValuationLabPage"),
);
const RiskIntelligencePage = lazy(
  () => import("./pages/RightSidebar/RiskIntelligencePage"),
);
const ReportsDocumentsPage = lazy(
  () => import("./pages/RightSidebar/ReportsDocumentsPage"),
);
const InvestmentPortfolioPage = lazy(
  () => import("./pages/RightSidebar/InvestmentPortfolioPage"),
);
const InfrastructureTrackerPage = lazy(
  () => import("./pages/RightSidebar/InfrastructureTrackerPage"),
);
const NotificationCenterPage = lazy(
  () => import("./pages/RightSidebar/NotificationCenterPage"),
);
const ProfileVerificationPage = lazy(
  () => import("./pages/RightSidebar/ProfileVerificationPage"),
);

// Clock/Time pages
const ClockDemoPage = lazy(() => import("./pages/ClockDemoPage"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

const PageLoader = () => (
  <div className="flex min-h-screen items-center justify-center p-8">
    <div className="w-full max-w-2xl space-y-4">
      <SkeletonBlock className="h-12 w-3/4" />
      <SkeletonBlock className="h-8 w-full" />
      <SkeletonBlock className="h-8 w-5/6" />
    </div>
  </div>
);

const rootRoute = createRootRoute({
  component: () => (
    <>
      <UserSettingsBootstrapper />
      <DashboardLayout />
    </>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <LandingPage />
    </Suspense>
  ),
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <LoginPage />
    </Suspense>
  ),
});

const searchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/search",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <LandSearchPage />
    </Suspense>
  ),
});

const recordDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/record/$id",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <LandRecordDetailPage />
    </Suspense>
  ),
});

const myApplicationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/applications",
  component: () => (
    <RequireAuth>
      <Suspense fallback={<PageLoader />}>
        <MyApplicationsPage />
      </Suspense>
    </RequireAuth>
  ),
});

const newApplicationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/applications/new",
  component: () => (
    <RequireAuth>
      <Suspense fallback={<PageLoader />}>
        <NewApplicationPage />
      </Suspense>
    </RequireAuth>
  ),
});

const applicationDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/applications/$id",
  component: () => (
    <RequireAuth>
      <Suspense fallback={<PageLoader />}>
        <ApplicationDetailPage />
      </Suspense>
    </RequireAuth>
  ),
});

const queueRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/queue",
  component: () => (
    <RequireAuth>
      <Suspense fallback={<PageLoader />}>
        <ApplicationsQueuePage />
      </Suspense>
    </RequireAuth>
  ),
});

const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ServicesGatewayPage />
    </Suspense>
  ),
});

const verificationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/verify",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <VerificationPage />
    </Suspense>
  ),
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: () => (
    <RequireAuth>
      <Suspense fallback={<PageLoader />}>
        <DashboardPage />
      </Suspense>
    </RequireAuth>
  ),
});

const marketRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/market",
  component: () => (
    <RequireAuth>
      <Suspense fallback={<PageLoader />}>
        <MarketTrendDashboardPage />
      </Suspense>
    </RequireAuth>
  ),
});

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/settings",
  component: () => (
    <RequireAuth>
      <Suspense fallback={<PageLoader />}>
        <SettingsPage />
      </Suspense>
    </RequireAuth>
  ),
});

const kenyaLandViewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/kenya-land-view",
  component: () => (
    <RequireAuth>
      <Suspense fallback={<PageLoader />}>
        <KenyaLandViewPage />
      </Suspense>
    </RequireAuth>
  ),
});

const messagesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/messages",
  component: () => (
    <RequireAuth>
      <Suspense fallback={<PageLoader />}>
        <MessagesPage />
      </Suspense>
    </RequireAuth>
  ),
});

// Right sidebar routes
const marketplaceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/marketplace",
  component: () => (
    <RequireAuth>
      <Suspense fallback={<PageLoader />}>
        <MarketplacePage />
      </Suspense>
    </RequireAuth>
  ),
});

const marketAnalyticsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/market-analytics",
  component: () => (
    <RequireAuth>
      <Suspense fallback={<PageLoader />}>
        <MarketAnalyticsPage />
      </Suspense>
    </RequireAuth>
  ),
});

const aiValuationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai-valuation",
  component: () => (
    <RequireAuth>
      <Suspense fallback={<PageLoader />}>
        <AIValuationLabPage />
      </Suspense>
    </RequireAuth>
  ),
});

const riskIntelligenceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/risk-intelligence",
  component: () => (
    <RequireAuth>
      <Suspense fallback={<PageLoader />}>
        <RiskIntelligencePage />
      </Suspense>
    </RequireAuth>
  ),
});

const reportsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reports",
  component: () => (
    <RequireAuth>
      <Suspense fallback={<PageLoader />}>
        <ReportsDocumentsPage />
      </Suspense>
    </RequireAuth>
  ),
});

const portfolioRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/portfolio",
  component: () => (
    <RequireAuth>
      <Suspense fallback={<PageLoader />}>
        <InvestmentPortfolioPage />
      </Suspense>
    </RequireAuth>
  ),
});

const infrastructureRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/infrastructure",
  component: () => (
    <RequireAuth>
      <Suspense fallback={<PageLoader />}>
        <InfrastructureTrackerPage />
      </Suspense>
    </RequireAuth>
  ),
});

const notificationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/notifications",
  component: () => (
    <RequireAuth>
      <Suspense fallback={<PageLoader />}>
        <NotificationCenterPage />
      </Suspense>
    </RequireAuth>
  ),
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: () => (
    <RequireAuth>
      <Suspense fallback={<PageLoader />}>
        <ProfileVerificationPage />
      </Suspense>
    </RequireAuth>
  ),
});

const transactionWorkflowRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/transactions",
  component: () => (
    <RequireAuth>
      <Suspense fallback={<PageLoader />}>
        <TransactionWorkflowPage />
      </Suspense>
    </RequireAuth>
  ),
});

// Clock demo route
const clockRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/clock",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ClockDemoPage />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  searchRoute,
  recordDetailRoute,
  myApplicationsRoute,
  newApplicationRoute,
  applicationDetailRoute,
  queueRoute,
  servicesRoute,
  verificationRoute,
  dashboardRoute,
  marketRoute,
  settingsRoute,
  kenyaLandViewRoute,
  messagesRoute,
  marketplaceRoute,
  marketAnalyticsRoute,
  aiValuationRoute,
  riskIntelligenceRoute,
  reportsRoute,
  portfolioRoute,
  infrastructureRoute,
  notificationsRoute,
  profileRoute,
  transactionWorkflowRoute,
  clockRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
        themes={["light", "dark", "land-gold", "futuristic"]}
      >
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
