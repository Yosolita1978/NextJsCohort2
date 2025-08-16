import Link from "next/link";

async function getPosts() {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10', {
      next: { revalidate: 60 } // ISR: refresh cache every 60s
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch posts: ${res.status}`);
    }
    
    const posts = await res.json();
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}

export default async function BlogPage() {
  try {
    const posts = await getPosts();
    
    return (
      <main>
        <div className="container">
          <h1>Latest Blog Posts</h1>
          <ul>
            {posts.map(post => (
              <li key={post.id}>
                <Link href={`/posts/${post.id}`}>
                  <h3 style={{ 
                    margin: '0 0 0.5rem 0', 
                    fontSize: '1.25rem',
                    fontWeight: '600'
                  }}>
                    {post.title}
                  </h3>
                  <p style={{ 
                    color: 'var(--text-muted)', 
                    fontSize: '0.9rem',
                    margin: '0 0 0.5rem 0'
                  }}>
                    Post #{post.id} • By User {post.userId}
                  </p>
                  <p style={{ 
                    fontSize: '1rem',
                    lineHeight: '1.5',
                    margin: 0
                  }}>
                    {post.body.slice(0, 120)}...
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    );
  } catch (error) {
    return (
      <main>
        <div className="container">
          <h1>Blog Posts</h1>
          <div style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: '1rem',
            padding: '2rem',
            textAlign: 'center'
          }}>
            <h2 style={{ color: '#ef4444', marginBottom: '1rem' }}>
              Error Loading Posts
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
              We couldn&apos;t load the blog posts. Please check your internet connection and try again.
            </p>
            <p style={{ 
              color: 'var(--text-muted)', 
              fontSize: '0.9rem',
              fontFamily: 'monospace'
            }}>
              Error: {error.message}
            </p>
            <button 
              onClick={() => window.location.reload()}
              style={{
                background: 'var(--gradient-primary)',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '2rem',
                cursor: 'pointer',
                fontWeight: '500',
                marginTop: '1rem'
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      </main>
    );
  }
}