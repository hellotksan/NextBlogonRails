interface Post {
  id: string;
  title: string;
  content: string;
}

type Props = {
  post: Post;
};

export async function getServerSideProps(context: any) {
  const { id } = context.query;
  const res = await fetch(`http://localhost:3001/api/v1/posts/${id}`);
  const post = await res.json();

  return {
    props: {
      post,
    },
  };
}

export default function Post({ post }: Props) {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}
