export interface Post {
  id: string;
  url: string;
  title: string;
  summary: string;
  scope: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePost extends Partial<Post> {
  url: string;
  title: string;
}
