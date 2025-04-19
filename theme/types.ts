export interface FontStyle {
    fontFamily: string;
    fontWeight: '200' | '300' | '400' | '500' | '700' | '900';
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
      regular: FontStyle;
      medium: FontStyle;
      bold: FontStyle;
      heavy: FontStyle;
    };
  }