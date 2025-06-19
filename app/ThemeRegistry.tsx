"use client";
import { ThemeProvider, CssBaseline } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getCustomTheme, ThemeColors } from "./theme";
import { getCookie } from "cookies-next";

function getThemeColorsFromCookies(): ThemeColors {
  return {
    primary: (getCookie("primary") as string) || undefined,
    secondary: (getCookie("secondary") as string) || undefined,
    error: (getCookie("error") as string) || undefined,
    warning: (getCookie("warning") as string) || undefined,
    info: (getCookie("info") as string) || undefined,
    success: (getCookie("success") as string) || undefined,
    text: (getCookie("text") as string) || undefined,
    background: (getCookie("background") as string) || undefined,
    divider: (getCookie("divider") as string) || undefined,
    commonWhite: (getCookie("commonWhite") as string) || undefined,
    commonBlack: (getCookie("commonBlack") as string) || undefined,
    grey100: (getCookie("grey100") as string) || undefined,
    grey500: (getCookie("grey500") as string) || undefined,
    buttonColor: (getCookie("buttonColor") as string) || undefined,
    iconColor: (getCookie("iconColor") as string) || undefined,
    drawerHoverColor: (getCookie("drawerHoverColor") as string) || undefined,
  };
}

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState(() => getCustomTheme(getThemeColorsFromCookies()));
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // On client, re-read cookies and update theme after mount
    setTheme(getCustomTheme(getThemeColorsFromCookies()));
    setReady(true);
  }, []);

  if (!ready) return null;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
} 