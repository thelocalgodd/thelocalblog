import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
const apiUrl = require("../../routes");

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${apiUrl.API_URL}/post/${id}`);
        setContent(response.data.content);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${apiUrl.API_URL}/api/posts/update/${id}`, {
        content,
        privateKey,
      });
      navigate(`/post/${id}`);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await axios.delete(`${apiUrl.API_URL}/api/posts/delete/${id}`, {
          data: { privateKey },
        });
        navigate("/");
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  return (
    <main className="md:w-[800px] md:mx-auto mt-4">
      <Header />
      <section className="m-8">
        <h1 className="text-2xl font-bold mb-4">edit post</h1>
        <form onSubmit={handleSubmit}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border border-solid border-zinc-600 w-full h-64 p-2 outline-none rounded-lg mb-2"
          />
          <input
            type="text"
            value={privateKey}
            onChange={(e) => setPrivateKey(e.target.value)}
            placeholder="Enter private key"
            className="border border-solid border-zinc-600 w-full p-2 outline-none rounded-lg mb-2"
          />
          <button
            type="submit"
            className="bg-blue-400 w-full mt-2 py-2 rounded-lg text-white font-semibold"
          >
            update post
          </button>
        </form>
        <button
          onClick={handleDelete}
          className="bg-red-400 w-full mt-2 py-2 rounded-lg text-white font-semibold"
        >
          delete post
        </button>
      </section>
    </main>
  );
}

export default Edit;
