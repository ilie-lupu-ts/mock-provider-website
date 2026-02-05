import {
  Outlet,
  createRootRouteWithContext,
  redirect,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";

import Header from "../components/Header";
import type { AuthContextValue } from "../lib/auth";

type RouterContext = {
  auth: AuthContextValue;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad: ({ context, location }) => {
    if (
      !context.auth.isAuthenticated &&
      !location.pathname.startsWith("/login")
    ) {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: () => (
    <>
      <Header />
      <Outlet />
      <TanStackDevtools
        config={{
          position: "bottom-right",
        }}
        plugins={[
          {
            name: "Tanstack Router",
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </>
  ),
});
