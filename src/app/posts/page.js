async function getPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10', {
    next: { revalidate: 60 } // ISR: refresh cache every 60s
  });
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <>
      <h1>Blog</h1>
      <ul>
        {posts.map(p => (
          <li key={p.id}>
            <a href={`/posts/${p.id}`}>{p.title}</a>
          </li>
        ))}
      </ul>
    </>
  );
}