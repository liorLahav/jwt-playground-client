export interface User {
  _id: string;
  userName: string;
  role: "user" | "admin";
}
