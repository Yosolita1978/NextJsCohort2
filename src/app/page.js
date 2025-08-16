import BlogPage from "./posts/page";

export default function Home() {
  return (
    <main>
      <div className="container">
        <h1>Welcome to the Modern Tech Blog</h1>
        <p style={{ 
          textAlign: 'center', 
          fontSize: '1.2rem', 
          color: 'var(--text-muted)',
          marginBottom: '3rem',
          maxWidth: '600px',
          margin: '0 auto 3rem auto'
        }}>
          Discover the latest in web development, Next.js, and modern JavaScript frameworks.
        </p>
        <BlogPage />
      </div>
    </main>
  );
}