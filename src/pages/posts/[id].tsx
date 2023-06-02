import styles from "../../styles/Post.module.css";

interface Post {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

type Props = {
  post: Post;
};

export async function getStaticPaths() {
  const res = await fetch("http://localhost:3001/api/v1/posts");
  const posts: Post[] = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: 'blocking' } will server-render pages
  // on-demand if not generated at build time.
  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const res = await fetch(`http://localhost:3001/api/v1/posts/${params.id}`);
  const post = await res.json();

  return {
    props: {
      post,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 60, // In seconds
  };
}

export default function Post({ post }: Props) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{post.title}</h1>
      <div className={styles.date}>Posted on {post.created_at}</div>
      <p className={styles.content}>{post.content}</p>
    </div>
  );
}
