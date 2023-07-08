import { useState } from "react";
import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  AuthPage,
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
import { supabaseClient } from "./utility";

function App() {
  const boolData = window.localStorage.getItem('boolData');
  const [signUp, setSignUP] = useState(boolData);

  return (
    <BrowserRouter>
      <Refine routerProvider={routerBindings}
        dataProvider={supabaseClient}
        liveProvider={supabaseClient}
      >
        <Routes>
          <Route index element={<Landing setSignUP={setSignUP} />} />
          <Route path="user-form" element={<FormCheck signUp={signUp} setSignUP={setSignUP} supabase={supabaseClient} />} />
          <Route path="preferences" element={<Preferences />} />
        </Routes>
      </Refine>
    </BrowserRouter>
  );
}

export default App;
