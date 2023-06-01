import { ChangeEvent, FormEvent, useState } from "react";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { useRouter } from "next/router";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
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
      const response = await axios.post("http://localhost:3001/api/v1/posts", {
        title: title,
        content: content,
      });
      router.push("/");
    } catch (error) {
      alert("Error creating post");
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ブログ新規登録</h1>
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
          Submit
        </button>
      </form>
    </div>
  );
}
