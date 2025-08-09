async function getPost(id) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    cache: 'force-cache' // default; change to next: { revalidate: 60 } for ISR
  });
  if (!res.ok) throw new Error('Failed to fetch post');
  return res.json();
}

export async function generateStaticParams() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
  const posts = await res.json();
  return posts.map(post => ({ id: post.id.toString() }));
}

export default async function BlogPost({ params }) {
  const post = await getPost(params.id);
  return (
    <article>
      <h1>{post.title}</h1>
      <p style={{ color: '#6b7280' }}>Post #{post.id}</p>
      <p>{post.body}</p>
    </article>
  );
}