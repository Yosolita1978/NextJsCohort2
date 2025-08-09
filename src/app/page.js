import Image from "next/image";
import BlogPage from "./posts/page";

export default function Home() {
  return (
    <main>
      <h1>Welcome to the Mini Blog</h1>
      <BlogPage />
    </main>
  );
}