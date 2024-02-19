enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE'
}

export interface CreateTaskDto {
  title: string;
  description: string;
  status: TaskStatus;
}

export interface Task extends CreateTaskDto {
  id: number;
}
