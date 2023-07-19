import { useState } from "react";
import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  notificationProvider,
  RefineSnackbarProvider,
  ThemedLayoutV2,
  ThemedTitleV2,
} from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { dataProvider, liveProvider } from "@refinedev/supabase";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import authProvider from "./authProvider";
import { Landing } from "./pages/landing/landing.jsx";
import { FormCheck } from "./pages/user-form/userForm.jsx";
import { Preferences } from "./pages/preferences/preferences.jsx";
import { Recommended } from "./pages/recommended/recommended.jsx";
import { ArrayContextProvider } from "./components/arrayContext.jsx";
import { supabaseClient } from "./utility";

function App() {
  const boolData = window.localStorage.getItem('boolData');
  const [signUp, setSignUP] = useState(boolData);

  return (
    <RefineSnackbarProvider>
      <BrowserRouter>
        <Refine routerProvider={routerBindings}
          dataProvider={dataProvider(supabaseClient)}
          resources={[
              {
                name: "USER_ACCOUNTS",
                create: "/pages/user-form/userForm",
                list: "/pages/preferences/preferences",
              },
            ]}
          liveProvider={liveProvider(supabaseClient)}
          notificationProvider={notificationProvider}
          authProvider={authProvider}
        >
          <ArrayContextProvider>
            <Routes>
            <Route index element={<Landing setSignUP={setSignUP} />} />
            <Route path="user-form" element={<FormCheck signUp={signUp} setSignUP={setSignUP} />} />
            <Route path="preferences" element={<Preferences />} />
            <Route path="recommended" element={<Recommended  />} />
          </Routes>
          </ArrayContextProvider>
        </Refine>
      </BrowserRouter>
    </RefineSnackbarProvider>
  );
}

export default App;
