export interface Post {
  id: string;
  url: string;
  title: string;
  summary: string;
  scope: string;
  createdAt: string;
  updatedAt: string;
  viewed: number;
}

export interface User {
  id: string;
  // 内部用户
  isBeta: boolean;
}

export interface CreatePost extends Partial<Post> {
  url: string;
  title: string;
}

export type PostWithUser = Post & {
  user: User;
};
