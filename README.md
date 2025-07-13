WordPress Blog with Next.js
This is a blog project built with Next.js 13+ using the App Router. It connects to a public WordPress REST API and displays dynamic blog content.

Features
Uses Server Components for data fetching

Dynamic routing for single posts (/posts/[postId])

Displays:

Post title

Full rendered content

Date (formatted)

Featured image (if available)

Tags (if available)

Incremental Static Regeneration with revalidate set to 60 seconds

Simple loading UI using animated text in loading.tsx

Artificial 1.5 seconds delay added to loading to ensure the loading UI is visible even when data fetch is fast

Dummy comment form built as a Client Component

Responsive layout using Tailwind CSS

Clean, modular, and maintainable code

Data Source
All data is pulled from the following public API:

bash
Copy
https://public-api.wordpress.com/wp/v2/sites/en.blog.wordpress.com
Example endpoints:

All posts: /posts

Single post by ID: /posts/{id}

Project Structure
/app/posts/[postId]/page.tsx – Main post page (Server Component) with 1.5s artificial delay

/app/posts/[postId]/loading.tsx – Custom loading state shown while fetching post data

/components/PostClient.tsx – Client Component rendering the post content, featured image, tags, and comment form

/components/CommentForm.tsx – Dummy client-side comment form

Tailwind CSS for styling and layout

Notes
This is a read-only blog – no real commenting or admin features

All styling is done using Tailwind CSS

The comment form is for UI demonstration only

Live Demo:
https://nextjs-wordpress-blog-latest.vercel.app/
