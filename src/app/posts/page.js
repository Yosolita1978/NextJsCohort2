import { posts } from "@/data/data"; // JSX
import Link from "next/link";
import LikeButton from "@/components/LikeButton";

export default function Posts() {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.slug}>
            <Link href={`/posts/${post.slug}`}>{post.title}</Link>
            <LikeButton />
        </li>
      ))}
    </ul>
  );
}