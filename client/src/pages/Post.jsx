import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import Header from "../components/Header";

function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/post/${id}`
        );
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchPost();
  }, [id]);

  if (!post) return <div>loading...</div>;

  return (
    <main className="md:w-[800px] md:mx-auto mt-4">
      <Header />
      <section className="m-8">
        <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
        <div className="border border-solid border-zinc-600 p-4 rounded-lg">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
        <div className="mt-4">
          <a
            href={`/edit/${id}`}
            className="bg-blue-400 w-full mt-2 py-2 rounded-lg text-white font-semibold block text-center"
          >
            edit post
          </a>
        </div>
      </section>
    </main>
  );
}

export default Post;
