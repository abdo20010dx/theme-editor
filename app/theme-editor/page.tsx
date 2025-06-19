"use client";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Box, Button, Card, CardActions, CardContent, Divider, FormControlLabel, Grid, GridLegacy, IconButton, InputAdornment, MenuItem, Paper, Select, Stack, Switch, TextField, Tooltip, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { getCookie, setCookie } from "cookies-next";
import { SelectChangeEvent } from "@mui/material";

import React, { useEffect, useRef, useState } from "react";

const defaultColors = {
  primary: "#1976d2",
  primaryContrastText: "#ffffff",
  secondary: "#9c27b0",
  secondaryContrastText: "#ffffff",
  error: "#d32f2f",
  errorContrastText: "#ffffff",
  warning: "#ed6c02",
  warningContrastText: "#ffffff",
  info: "#0288d1",
  infoContrastText: "#ffffff",
  success: "#2e7d32",
  successContrastText: "#ffffff",
  text: "#222222",
  textSecondary: "#757575",
  textDisabled: "#9e9e9e",
  background: "#ffffff",
  backgroundDefault: "#fafafa",
  backgroundPaper: "#ffffff",
  divider: "#e0e0e0",
  commonWhite: "#ffffff",
  commonBlack: "#000000",
  grey100: "#f5f5f5",
  grey500: "#9e9e9e",
  buttonColor: "#1976d2",
  iconColor: "#1976d2",
  drawerHoverColor: "#f5f5f5",
  actionHover: "#f5f5f5",
  actionSelected: "rgba(0,0,0,0.08)",
  actionDisabled: "rgba(0,0,0,0.26)",
  actionFocus: "rgba(0,0,0,0.12)",
  mode: "light",
  fontFamily: "Roboto, Arial, sans-serif",
  fontSize: 14,
  buttonTextTransform: "uppercase",
  h1Size: "2.5rem",
  h2Size: "2rem",
  h3Size: "1.75rem",
  h4Size: "1.5rem",
  h5Size: "1.25rem",
  h6Size: "1rem",
  borderRadius: 8,
  shadow1: "0px 1px 3px rgba(0,0,0,0.2),0px 1px 1px rgba(0,0,0,0.14),0px 2px 1px rgba(0,0,0,0.12)",
  shadow2: "0px 1px 5px rgba(0,0,0,0.2),0px 2px 2px rgba(0,0,0,0.14),0px 3px 1px rgba(0,0,0,0.12)",
  shadow3: "0px 1.5px 10px rgba(0,0,0,0.2),0px 3px 4px rgba(0,0,0,0.14),0px 4.5px 2px rgba(0,0,0,0.12)",
};

const colorKeys = [
  { key: "primary", label: "Primary (brand)", type: "color" },
  { key: "primaryContrastText", label: "Primary Contrast Text", type: "color", contrast: "primary" },
  { key: "secondary", label: "Secondary (accent)", type: "color" },
  { key: "secondaryContrastText", label: "Secondary Contrast Text", type: "color", contrast: "secondary" },
  { key: "error", label: "Error", type: "color" },
  { key: "errorContrastText", label: "Error Contrast Text", type: "color", contrast: "error" },
  { key: "warning", label: "Warning", type: "color" },
  { key: "warningContrastText", label: "Warning Contrast Text", type: "color", contrast: "warning" },
  { key: "info", label: "Info", type: "color" },
  { key: "infoContrastText", label: "Info Contrast Text", type: "color", contrast: "info" },
  { key: "success", label: "Success", type: "color" },
  { key: "successContrastText", label: "Success Contrast Text", type: "color", contrast: "success" },
  { key: "text", label: "Text (primary)", type: "color" },
  { key: "textSecondary", label: "Text (secondary)", type: "color" },
  { key: "textDisabled", label: "Text (disabled)", type: "color" },
  { key: "background", label: "Background (paper)", type: "color" },
  { key: "backgroundDefault", label: "Background (default)", type: "color" },
  { key: "backgroundPaper", label: "Background (paper override)", type: "color" },
  { key: "divider", label: "Divider", type: "color" },
  { key: "commonWhite", label: "Common White", type: "color" },
  { key: "commonBlack", label: "Common Black", type: "color" },
  { key: "grey100", label: "Grey 100", type: "color" },
  { key: "grey500", label: "Grey 500", type: "color" },
  { key: "buttonColor", label: "Button Color", type: "color" },
  { key: "iconColor", label: "Drawer Icon Color", type: "color" },
  { key: "drawerHoverColor", label: "Drawer Hover Color", type: "color" },
  { key: "actionHover", label: "Action Hover", type: "color" },
  { key: "actionSelected", label: "Action Selected", type: "color" },
  { key: "actionDisabled", label: "Action Disabled", type: "color" },
  { key: "actionFocus", label: "Action Focus", type: "color" },
];

const advancedKeys = [
  { key: "mode", label: "Light/Dark Mode", type: "toggle" },
  { key: "fontFamily", label: "Font Family", type: "text" },
  { key: "fontSize", label: "Font Size", type: "number" },
  { key: "buttonTextTransform", label: "Button Text Transform", type: "select", options: ["none", "capitalize", "uppercase", "lowercase", "initial", "inherit"] },
  { key: "h1Size", label: "H1 Size", type: "text" },
  { key: "h2Size", label: "H2 Size", type: "text" },
  { key: "h3Size", label: "H3 Size", type: "text" },
  { key: "h4Size", label: "H4 Size", type: "text" },
  { key: "h5Size", label: "H5 Size", type: "text" },
  { key: "h6Size", label: "H6 Size", type: "text" },
  { key: "borderRadius", label: "Border Radius", type: "number" },
  { key: "shadow1", label: "Shadow 1", type: "text" },
  { key: "shadow2", label: "Shadow 2", type: "text" },
  { key: "shadow3", label: "Shadow 3", type: "text" },
];

type Colors = { [K in keyof typeof defaultColors]: string | number };

export default function ThemeEditorPage() {
  const [colors, setColors] = useState<Colors>({ ...defaultColors });
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const theme = useTheme();

  useEffect(() => {
    // Load from cookies on mount
    const newColors: Colors = { ...defaultColors };
    colorKeys.forEach(({ key }) => {
      const val = getCookie(key) as string;
      if (val) (newColors as any)[key] = val;
    });
    setColors(newColors);
    setLoading(false);
    // eslint-disable-next-line
  }, []);

  const handleChange = (key: string, value: string) => {
    setColors((prev: Colors) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    colorKeys.forEach(({ key }) => {
      setCookie(key, colors[key as keyof typeof colors], { path: "/" });
    });
    // Reload page to apply new theme
    window.location.reload();
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(colors, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "theme.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      try {
        const imported: Colors = JSON.parse(event.target?.result as string);
        let valid = true;
        colorKeys.forEach(({ key }) => {
          if (!imported[key as keyof Colors] || typeof imported[key as keyof Colors] !== "string") valid = false;
        });
        if (!valid) {
          alert("Invalid theme file.");
          return;
        }
        setColors(imported);
        colorKeys.forEach(({ key }) => {
          setCookie(key, imported[key as keyof Colors], { path: "/" });
        });
        window.location.reload();
      } catch {
        alert("Invalid theme file.");
      }
    };
    reader.readAsText(file);
  };

  const handleResetTheme = () => {
    setColors({ ...defaultColors });
  };

  const handleResetColor = (key: string) => {
    setColors((prev: Colors) => ({ ...prev, [key]: defaultColors[key as keyof typeof defaultColors] }));
  };

  if (loading) return null;

  return (
    <Box sx={{ maxWidth: { xs: '100%', sm: 600, md: 900 }, mx: "auto", mt: { xs: 2, sm: 4, md: 6 }, px: { xs: 1, sm: 2, md: 0 } }}>
      <Paper sx={{ p: { xs: 2, sm: 3, md: 4 }, borderRadius: 3, boxShadow: 3 }}>
        <Typography variant="h5" gutterBottom textAlign="center">
          Theme Editor
        </Typography>
        <Grid container spacing={2}>
          {colorKeys.map(({ key, label, type, contrast }) => (
            <GridLegacy item xs={4} key={key} sx={{ width: 300, minWidth: 300, maxWidth: 300 }}>
              <Box display="flex" alignItems="center">
                <Typography variant="subtitle1" gutterBottom sx={{ minWidth: 120 }}>{label}</Typography>
                <Box display="flex" alignItems="center" width="100%">
                  {type === "color" ? (
                    <TextField
                      type="color"
                      value={String(colors[key as keyof typeof colors]) || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(key, e.target.value)}
                      sx={{ width: 48, minWidth: 48, p: 0, bgcolor: "transparent" }}
                      inputProps={{ style: { padding: 0, width: 48, height: 36 } }}
                    />
                  ) : (
                    <TextField
                      value={String(colors[key as keyof typeof colors]) || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(key, e.target.value)}
                      sx={{ ml: 2, width: 120 }}
                      size="small"
                    />
                  )}
                  {contrast && (
                    <Box ml={2} display="flex" alignItems="center">
                      <Box
                        sx={{
                          width: 32,
                          height: 32,
                          borderRadius: 1,
                          bgcolor: colors[contrast as keyof typeof colors] || "#1976d2",
                          color: colors[key as keyof typeof colors] || "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: "1px solid #ccc",
                        }}
                      >
                        Aa
                      </Box>
                    </Box>
                  )}
                  <Tooltip title={`Reset ${label} to default`}>
                    <IconButton sx={{ ml: 1 }} onClick={() => handleResetColor(key)}>
                      <RestartAltIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </GridLegacy>
          ))}
        </Grid>
        <Divider sx={{ my: 4 }} />
        <Typography variant="h6" gutterBottom>Advanced Theme Options</Typography>
        <Grid container spacing={2}>
          {advancedKeys.map(({ key, label, type, options }) => (
            <GridLegacy item xs={4} key={key} sx={{ width: 300, minWidth: 300, maxWidth: 300 }}>
              <Box display="flex" alignItems="center">
                <Typography variant="subtitle2" sx={{ minWidth: 120 }}>{label}</Typography>
                {type === "toggle" ? (
                  <FormControlLabel
                    control={
                      <Switch
                        checked={colors[key as keyof typeof colors] === "dark"}
                        onChange={(_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => handleChange(key, checked ? "dark" : "light")}
                      />
                    }
                    label={colors[key as keyof typeof colors] === "dark" ? "Dark" : "Light"}
                    sx={{ ml: 2 }}
                  />
                ) : type === "select" ? (
                  <Select
                    value={String(colors[key as keyof typeof colors]) || ""}
                    onChange={(e: SelectChangeEvent) => handleChange(key, e.target.value as string)}
                    sx={{ ml: 2, minWidth: 120 }}
                    size="small"
                  >
                    {options?.map((opt) => (
                      <MenuItem value={opt} key={opt}>{opt}</MenuItem>
                    ))}
                  </Select>
                ) : type === "number" ? (
                  <TextField
                    type="number"
                    value={String(colors[key as keyof typeof colors]) || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(key, e.target.value)}
                    sx={{ ml: 2, width: 100 }}
                    size="small"
                    InputProps={{ endAdornment: key === "fontSize" ? <InputAdornment position="end">px</InputAdornment> : null }}
                  />
                ) : (
                  <TextField
                    value={String(colors[key as keyof typeof colors]) || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(key, e.target.value)}
                    sx={{ ml: 2, width: 140 }}
                    size="small"
                  />
                )}
                <Tooltip title={`Reset ${label} to default`}>
                  <IconButton sx={{ ml: 1 }} onClick={() => handleResetColor(key)}>
                    <RestartAltIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </GridLegacy>
          ))}
        </Grid>
        <Divider sx={{ my: 4 }} />
        <Typography variant="h6" gutterBottom>Live Theme Preview</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
          <Card sx={{ minWidth: 280, boxShadow: 3, borderRadius: theme.shape.borderRadius, bgcolor: theme.palette.background.paper }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>Card Title</Typography>
              <Typography variant="body2" color="text.secondary">This is a card using your theme settings.</Typography>
              <Typography variant="caption" color="text.disabled">Disabled text example</Typography>
            </CardContent>
            <CardActions>
              <Button variant="contained" color="primary">Primary</Button>
              <Button variant="contained" color="secondary">Secondary</Button>
              <Button variant="outlined" color="primary">Outlined</Button>
            </CardActions>
          </Card>
          <Box sx={{ minWidth: 220, p: 3, bgcolor: theme.palette.background.default, borderRadius: theme.shape.borderRadius, boxShadow: 1 }}>
            <Typography variant="h1" gutterBottom>H1 Heading</Typography>
            <Typography variant="h2" gutterBottom>H2 Heading</Typography>
            <Typography variant="h3" gutterBottom>H3 Heading</Typography>
            <Typography variant="body1">Body1 text</Typography>
            <Typography variant="body2" color="text.secondary">Secondary text</Typography>
            <Typography variant="caption" color="text.disabled">Disabled text</Typography>
          </Box>
        </Box>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 4, justifyContent: 'center', alignItems: 'center' }}>
          <Button variant="contained" color="primary" onClick={handleSave} fullWidth={true} sx={{ maxWidth: { xs: '100%', sm: 180 } }}>
            Save Theme
          </Button>
          <Button variant="outlined" onClick={handleExport} fullWidth={true} sx={{ maxWidth: { xs: '100%', sm: 180 } }}>
            Export Theme
          </Button>
          <Button variant="outlined" onClick={handleImportClick} fullWidth={true} sx={{ maxWidth: { xs: '100%', sm: 180 } }}>
            Import Theme
          </Button>
          <Button variant="outlined" color="error" onClick={handleResetTheme} fullWidth={true} sx={{ maxWidth: { xs: '100%', sm: 180 } }}>
            Reset Theme
          </Button>
          <input
            type="file"
            accept="application/json"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImport}
          />
        </Stack>
      </Paper>
    </Box>
  );
} 