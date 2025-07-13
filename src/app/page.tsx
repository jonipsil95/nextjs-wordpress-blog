// Server Component - עמוד הבית
import React from 'react';

type Post = {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  date: string;
};

async function getPosts(): Promise<Post[]> {
  const res = await fetch('https://public-api.wordpress.com/wp/v2/sites/en.blog.wordpress.com/posts', {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }

  return res.json();
}

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Latest Posts</h1>
      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post.id} className="border-b pb-4">
            <a href={`/posts/${post.id}`} className="text-2xl text-blue-600 hover:underline">
              {post.title.rendered}
            </a>
            <p className="text-sm text-gray-500">{new Date(post.date).toLocaleDateString()}</p>
            <div
              className="mt-2 text-gray-700"
              dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
            />
          </li>
        ))}
      </ul>
    </main>
  );
}
