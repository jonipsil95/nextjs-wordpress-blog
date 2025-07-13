'use client';

import Image from 'next/image';
import CommentForm from './CommentForm';

type Post = {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  date: string;
};

type PostClientProps = {
  post: Post;
  imageUrl: string | null;
  tagNames: string[];
};

export default function PostClient({ post, imageUrl, tagNames }: PostClientProps) {
  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{post.title.rendered}</h1>
      <p className="text-sm text-gray-500 mb-4">
        {new Date(post.date).toLocaleDateString()}
      </p>

      {tagNames.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {tagNames.map((tag) => (
            <span
              key={tag}
              className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded-full"
            >
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
