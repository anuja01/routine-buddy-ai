  export interface FontStyle {
  fontFamily: string;
  fontWeight: string;
  fontSize?: number;
  lineHeight?: number;
}
export interface CustomTheme {
  dark: boolean;
  colors: {
    primary: string;
    background: string;
    surface: string;
    card: string;
    text: string;
    mutedText: string;
    accent: string;
    success: string;
    warning: string;
    error: string;
    border: string;
    notification: string;
  };
  fonts: {
    header: FontStyle;
    title: FontStyle;
    label: FontStyle;
    body: FontStyle;
    caption: FontStyle;
  };
  spacing: {
    small: number;
    medium: number;
    large: number;
    xlarge: number;
    xxlarge: number;
  };
  borderRadius: {
    small: number;
    medium: number;
    large: number;
  };
}