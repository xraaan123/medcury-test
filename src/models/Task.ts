export interface Task {
  id: number;
  userId: number;
  title: string;
  description?: string;
  dueDate?: Date;
  priority: "low" | "medium" | "high";
  status: "pending" | "completed";
}
