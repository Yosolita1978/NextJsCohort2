import { posts } from "@/data/data";

export async function generateStaticParams() {
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default function Post({ params }) {
    const post = posts.find((post) => post.slug === params.slug);
    if(!post) return <div>Post not found</div>;
    return (
        <main>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </main>
      );
}