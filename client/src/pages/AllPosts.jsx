import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../components/Header";
const apiUrl = require("../../routes");

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${apiUrl}/posts`);
        // Check if response.data is an array
        if (Array.isArray(response.data)) {
          setPosts(response.data);
        } else if (typeof response.data === "object") {
          // If it's an object, it might be paginated or nested
          setPosts(response.data.posts || Object.values(response.data));
        } else {
          throw new Error("Unexpected data structure");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to fetch posts. Please try again later.");
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error)
    return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <main className="md:w-[800px] md:mx-auto mt-4">
      <Header />
      <section className="m-8">
        <h1 className="text-2xl font-bold mb-4">All Posts</h1>
        {posts.length === 0 ? (
          <p>No posts found.</p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id || post._id}
              className="mb-4 px-2 border border-zinc-300 rounded-lg flex justify-between"
            >
              <Link
                to={`/post/${post.id || post._id}`}
                className="text-xl font-semibold text-blue-600 hover:underline"
              >
                {post.title}
              </Link>
              <p className="text-sm text-gray-500 mt-1">
                {post.createdAt
                  ? new Date(post.createdAt).toLocaleDateString()
                  : "Date not available"}
              </p>
            </div>
          ))
        )}
      </section>
    </main>
  );
}

export default AllPosts;
