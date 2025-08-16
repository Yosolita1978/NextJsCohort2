import LikeButton from "@/components/LikeButton";
import Link from "next/link";

async function getPost(id) {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      cache: 'force-cache'
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch post: ${res.status}`);
    }
    
    const post = await res.json();
    
    // JSONPlaceholder should return a single post object, not an array
    // But let's add a safety check just in case
    if (Array.isArray(post)) {
      console.warn('Unexpected array response, taking first item');
      return post[0];
    }
    
    return post;
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
}

export async function generateStaticParams() {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
    if (!res.ok) {
      throw new Error('Failed to fetch posts for static generation');
    }
    const posts = await res.json();
    return posts.map(post => ({ 
      id: post.id.toString() 
    }));
  } catch (error) {
    console.error('Error in generateStaticParams:', error);
    // Fallback to generate params for posts 1-10
    return Array.from({ length: 10 }, (_, i) => ({ 
      id: (i + 1).toString() 
    }));
  }
}

export default async function BlogPost({ params }) {
  try {
    const post = await getPost(params.id);
    
    return (
      <main>
        <div className="container">
          <article>
            <h1>{post.title}</h1>
            <p style={{ color: '#6b7280' }}>Post #{post.id} • By User {post.userId}</p>
            <p>{post.body}</p>
            <LikeButton />
          </article>
        </div>
      </main>
    );
  } catch (error) {
    return (
      <main>
        <div className="container">
          <article>
            <h1>Error Loading Post</h1>
            <p style={{ color: '#ef4444' }}>
              Sorry, we couldn&apos;t load this post. Please try again later.
            </p>
            <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
              Error: {error.message}
            </p>
            <Link 
              href="/posts" 
              style={{ 
                color: 'var(--brand)', 
                textDecoration: 'none',
                fontWeight: '500'
              }}
            >
              ← Back to all posts
            </Link>
          </article>
        </div>
      </main>
    );
  }
}