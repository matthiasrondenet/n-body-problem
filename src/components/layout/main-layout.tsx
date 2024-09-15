import { PropsWithChildren, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { ClientOnly } from "vite-react-ssg";
import {
  Layout,
  LayoutBody,
  LayoutHeader,
} from "@/components/ui-custom/layout";

import { Header } from "./header/header";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "../error-fallback";
import { ThemeProvider } from "./header/theme-provider";

const Theme: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ClientOnly fallback={<>{children}</>}>
      {() => {
        return (
          <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
            {children}
          </ThemeProvider>
        );
      }}
    </ClientOnly>
  );
};

const MainLayout: React.FC = () => {
  return (
    <>
      {/* <Head>
        <meta charSet="UTF-8" />
        <title>N Body simulation</title>
      </Head> */}
      <main>
        <Theme>
          <Layout>
            <LayoutHeader>
              <Header />
            </LayoutHeader>
            <LayoutBody className="space-y-4">
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Suspense>
                  <Outlet />
                </Suspense>
              </ErrorBoundary>
            </LayoutBody>
          </Layout>
        </Theme>
      </main>
    </>
  );
};

export default MainLayout;
