export interface Task {
  id?: string;
  name: string;
  icon: string
  isCompleted?: boolean;
  onPress?: () => void;
  status?: 'next' | 'queued' | 'completed' | 'skipped';
  disabled?: boolean;
  isActive?: boolean;
}