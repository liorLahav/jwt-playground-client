export interface Post {
  title: string;
  content: string;
}

export type PostResponse = Post & {
  _id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  userName: string;
};
