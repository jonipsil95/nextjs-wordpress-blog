WordPress Blog with Next.js

This is a blog project built with Next.js 13+ using the App Router. It connects to a public WordPress REST API and displays dynamic blog content.

Features
Uses Server Components for data fetching

Dynamic routing for single posts (/posts/[id])

Displays:

Post title

Full rendered content

Date

Featured image (if available)

Tags (if available)

Incremental Static Regeneration with revalidate set to 60 seconds

Simple loading UI using animated text

Dummy comment form built as a Client Component

Responsive layout using Tailwind CSS

Clean, modular, and maintainable code

Data Source
All data is pulled from the following public API:

https://public-api.wordpress.com/wp/v2/sites/en.blog.wordpress.com

Example endpoints:

All posts: /posts

Single post by ID: /posts/{id}

Project Structure
/app/posts/[id]/page.tsx – Main post page (Server Component)

/components/CommentForm.tsx – Dummy client-side comment form

/app/posts/[id]/loading.tsx – Custom loading state while fetching

Notes
This is a read-only blog – no real commenting or admin features

All styling is done using Tailwind CSS

The comment form is for UI demonstration only
