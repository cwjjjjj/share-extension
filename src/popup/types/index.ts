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

export interface CreatePost extends Partial<Post> {
  url: string;
  title: string;
}

export type PostWithUserId = Post & { user: { id: string } };
