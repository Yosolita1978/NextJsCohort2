
# Mini Blog in Next.js – One-Page Class Handout (JavaScript Version)

## 🧰 What You’ll Learn
- How to scaffold a Next.js app using the App Router
- How to create static and dynamic routes
- How to use server and client components
- How to simulate data fetching
- How to use React state in Next.js

---

## 📁 Project Structure
```
my-mini-blog-js/
├── app/
│   ├── page.js              # Home
│   └── posts/
│       ├── page.js          # Blog list
│       └── [slug]/page.js   # Individual post
├── components/LikeButton.js # Client component
├── data/posts.js            # Blog data
```

---

## 🛠 Setup Instructions
```bash
npx create-next-app@latest my-mini-blog-js --javascript --app
cd my-mini-blog-js
npm run dev
```

---

## ✍️ Key Code Snippets

### 1. `data/posts.js`
```js
export const posts = [
  { slug: "hello-nextjs", title: "Hello Next.js", content: "..." },
  { slug: "about-server-components", title: "About Server Components", content: "..." },
];
```

### 2. `app/page.js`
```jsx
export default function HomePage() {
  return <a href="/posts">Go to Posts</a>;
}
```

### 3. `app/posts/page.js`
```jsx
import { posts } from "../../data/posts";
import Link from "next/link";

export default function PostsPage() {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.slug}>
          <Link href={"/posts/" + post.slug}>{post.title}</Link>
        </li>
      ))}
    </ul>
  );
}
```

### 4. `app/posts/[slug]/page.js`
```jsx
import { posts } from "../../../data/posts";

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({ params }) {
  const post = posts.find(p => p.slug === params.slug);
  return post ? (
    <>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
    </>
  ) : <p>Not found</p>;
}
```

### 5. `components/LikeButton.js`
```jsx
"use client";
import { useState } from "react";

export default function LikeButton() {
  const [likes, setLikes] = useState(0);
  return <button onClick={() => setLikes(likes + 1)}>❤️ {likes} Likes</button>;
}
```

Use `<LikeButton />` inside `PostPage`.

---

## 📚 Additional Learning
- [Server Components](https://react.dev/reference/rsc/server-components)
- [Next.js App Router Docs](https://nextjs.org/docs/app/building-your-application/routing)

Happy coding! 🚀
