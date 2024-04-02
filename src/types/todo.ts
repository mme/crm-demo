interface Todo {
  type: "call" | "meeting" | "task" | "email";
  description: string;
  done: boolean;
}
