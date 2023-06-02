import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import styles from "../../styles/Home.module.css";
import axios from "axios";
import { useRouter } from "next/router";

type Post = {
  title: string;
  content: string;
  id: string;
};

type Props = {
  post: Post;
};

export default function EditPost({ post }: Props) {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const router = useRouter();

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:3001/api/v1/posts/${post.id}`,
        {
          title: title,
          content: content,
        }
      );
      if (response.status === 200) {
        router.push("/");
      } else {
        alert("Error updating post");
      }
    } catch (error) {
      alert("Error updating post");
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ブログ編集</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>Title:</label>
        <input
          className={styles.input}
          type="text"
          value={title}
          onChange={handleTitleChange}
        />
        <label className={styles.label}>Content:</label>
        <textarea
          className={styles.textarea}
          value={content}
          onChange={handleContentChange}
        />
        <button className={styles.button} type="submit">
          Update
        </button>
      </form>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const { id } = context.params;
  const res = await fetch(`http://localhost:3001/api/v1/posts/${id}`);
  const post = await res.json();

  return {
    props: {
      post,
    },
  };
}
