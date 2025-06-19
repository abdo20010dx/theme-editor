import { createTheme } from '@mui/material/styles';

export interface ThemeColors {
  primary?: string;
  primaryContrastText?: string;
  secondary?: string;
  secondaryContrastText?: string;
  error?: string;
  errorContrastText?: string;
  warning?: string;
  warningContrastText?: string;
  info?: string;
  infoContrastText?: string;
  success?: string;
  successContrastText?: string;
  text?: string;
  textSecondary?: string;
  textDisabled?: string;
  background?: string;
  backgroundDefault?: string;
  backgroundPaper?: string;
  divider?: string;
  commonWhite?: string;
  commonBlack?: string;
  grey100?: string;
  grey500?: string;
  buttonColor?: string;
  iconColor?: string;
  drawerHoverColor?: string;
  // Action
  actionHover?: string;
  actionSelected?: string;
  actionDisabled?: string;
  actionFocus?: string;
  // Mode
  mode?: 'light' | 'dark';
  // Typography
  fontFamily?: string;
  fontSize?: number;
  buttonTextTransform?: string;
  h1Size?: string;
  h2Size?: string;
  h3Size?: string;
  h4Size?: string;
  h5Size?: string;
  h6Size?: string;
  // Shape
  borderRadius?: number;
  // Shadows
  shadow1?: string;
  shadow2?: string;
  shadow3?: string;
}

export function getCustomTheme(colors: ThemeColors = {}) {
  const theme = createTheme({
    palette: {
      mode: colors.mode || 'light',
      primary: {
        main: colors.primary || '#1976d2',
        contrastText: colors.primaryContrastText || '#fff',
      },
      secondary: {
        main: colors.secondary || '#9c27b0',
        contrastText: colors.secondaryContrastText || '#fff',
      },
      error: {
        main: colors.error || '#d32f2f',
        contrastText: colors.errorContrastText || '#fff',
      },
      warning: {
        main: colors.warning || '#ed6c02',
        contrastText: colors.warningContrastText || '#fff',
      },
      info: {
        main: colors.info || '#0288d1',
        contrastText: colors.infoContrastText || '#fff',
      },
      success: {
        main: colors.success || '#2e7d32',
        contrastText: colors.successContrastText || '#fff',
      },
      text: {
        primary: colors.text || '#222',
        secondary: colors.textSecondary || '#757575',
        disabled: colors.textDisabled || '#9e9e9e',
      },
      background: {
        default: colors.backgroundDefault || '#fafafa',
        paper: colors.backgroundPaper || colors.background || '#fff',
      },
      divider: colors.divider || '#e0e0e0',
      common: {
        white: colors.commonWhite || '#fff',
        black: colors.commonBlack || '#000',
      },
      grey: {
        100: colors.grey100 || '#f5f5f5',
        500: colors.grey500 || '#9e9e9e',
      },
      action: {
        hover: colors.actionHover || colors.drawerHoverColor || '#f5f5f5',
        selected: colors.actionSelected || 'rgba(0,0,0,0.08)',
        disabled: colors.actionDisabled || 'rgba(0,0,0,0.26)',
        focus: colors.actionFocus || 'rgba(0,0,0,0.12)',
      },
    },
    shape: {
      borderRadius: colors.borderRadius ?? 8,
    },
    shadows: [
      'none',
      colors.shadow1 || '0px 1px 3px rgba(0,0,0,0.2),0px 1px 1px rgba(0,0,0,0.14),0px 2px 1px rgba(0,0,0,0.12)',
      colors.shadow2 || '0px 1px 5px rgba(0,0,0,0.2),0px 2px 2px rgba(0,0,0,0.14),0px 3px 1px rgba(0,0,0,0.12)',
      colors.shadow3 || '0px 1.5px 10px rgba(0,0,0,0.2),0px 3px 4px rgba(0,0,0,0.14),0px 4.5px 2px rgba(0,0,0,0.12)',
      ...Array(21).fill('none'),
    ] as any,
    typography: {
      fontFamily: colors.fontFamily || 'Roboto, Arial, sans-serif',
      fontSize: colors.fontSize || 14,
      button: {
        textTransform: (colors.buttonTextTransform || 'uppercase') as any,
      },
      h1: { fontSize: colors.h1Size || '2.5rem' },
      h2: { fontSize: colors.h2Size || '2rem' },
      h3: { fontSize: colors.h3Size || '1.75rem' },
      h4: { fontSize: colors.h4Size || '1.5rem' },
      h5: { fontSize: colors.h5Size || '1.25rem' },
      h6: { fontSize: colors.h6Size || '1rem' },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            backgroundColor: colors.buttonColor || colors.primary || '#1976d2',
            color: '#fff',
            '&:hover': {
              backgroundColor: colors.buttonColor || colors.primary || '#115293',
            },
          },
        },
      },
    },
  });
  (theme as any).custom = {
    iconColor: colors.iconColor || '#1976d2',
  };
  return theme;
} 