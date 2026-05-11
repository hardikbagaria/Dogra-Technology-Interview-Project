export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
}

export interface TaskRequest {
  title: string;
  description: string;
  status: TaskStatus;
}

export interface PagedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface TaskParams {
  page?: number;
  size?: number;
  sortBy?: string;
  direction?: 'asc' | 'desc';
  status?: TaskStatus | '';
}
