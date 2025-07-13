import Image from 'next/image';
import CommentForm from '@/components/CommentForm';

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

async function getPost(id: string): Promise<Post> {
  const res = await fetch(`https://public-api.wordpress.com/wp/v2/sites/en.blog.wordpress.com/posts/${id}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch post');
  }

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
  const res = await fetch(`https://public-api.wordpress.com/wp/v2/sites/en.blog.wordpress.com/tags/${tagId}`);
  if (!res.ok) return null;
  const tag = await res.json();
  return tag.name || null;
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);
  const imageUrl = await getFeaturedImage(post);
  const tagNames: string[] = [];

  if (post.tags && post.tags.length > 0) {
    for (const tagId of post.tags) {
      const tagName = await getTagName(tagId);
      if (tagName) tagNames.push(tagName);
    }
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{post.title.rendered}</h1>
      <p className="text-sm text-gray-500 mb-4">{new Date(post.date).toLocaleDateString()}</p>

      {tagNames.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {tagNames.map((tag) => (
            <span key={tag} className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {imageUrl && (
        <div className="mb-6 rounded shadow-md overflow-hidden">
          <Image
            src={imageUrl}
            alt="Featured"
            width={800}
            height={400}
            className="object-cover w-full h-auto"
          />
        </div>
      )}

      <div
        className="prose prose-lg"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
      <CommentForm />
    </main>
  );
}
