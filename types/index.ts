export type Post = {
  $id: string;
  title: string;
  thumbnail: string;
  video: string;
  prompt: string;
  users?: {
    username?: string;
    avatar?: string;
  };
};
