import { CustomTheme } from '@/theme/types';
import { useTheme } from '@react-navigation/native';

export const useAppTheme = () => useTheme() as ReturnType<typeof useTheme> & {
  colors: CustomTheme['colors'];
};