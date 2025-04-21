// styled.d.ts
import 'styled-components/native';
import { lightTheme } from './index';

type AppTheme = typeof lightTheme;

declare module 'styled-components/native' {
  export interface DefaultTheme extends AppTheme {}
}
