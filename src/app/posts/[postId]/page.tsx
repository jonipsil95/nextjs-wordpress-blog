import PostClient from '@/components/PostClient';

type Post = {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  date: string;
  tags?: number[];
  _links?: {
    'wp:featuredmedia'?: { href: string }[];
  };
};

export async function generateStaticParams() {
  const res = await fetch(
    'https://public-api.wordpress.com/wp/v2/sites/en.blog.wordpress.com/posts'
  );
  const posts: Post[] = await res.json();
  return posts.map((post) => ({
    postId: post.id.toString(),
  }));
}

export const dynamicParams = true;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function PostPage({ params }: any) {

  await new Promise((resolve) => setTimeout(resolve, 1500));

  const post = await getPost(params.postId);
  const imageUrl = await getFeaturedImage(post);
  const tagNames = post.tags
    ? await Promise.all(post.tags.map(getTagName)).then((tags) =>
        tags.filter(Boolean) as string[]
      )
    : [];

  return <PostClient post={post} imageUrl={imageUrl} tagNames={tagNames} />;
}

async function getPost(id: string): Promise<Post> {
  const res = await fetch(
    `https://public-api.wordpress.com/wp/v2/sites/en.blog.wordpress.com/posts/${id}`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) throw new Error('Failed to fetch post');
  return res.json();
}

async function getFeaturedImage(post: Post): Promise<string | null> {
  const mediaLink = post._links?.['wp:featuredmedia']?.[0]?.href;
  if (!mediaLink) return null;

  const res = await fetch(mediaLink);
  if (!res.ok) return null;

  const data = await res.json();
  return data?.source_url || null;
}

async function getTagName(tagId: number): Promise<string | null> {
  const res = await fetch(
    `https://public-api.wordpress.com/wp/v2/sites/en.blog.wordpress.com/tags/${tagId}`
  );
  if (!res.ok) return null;

  const tag = await res.json();
  return tag.name || null;
}
