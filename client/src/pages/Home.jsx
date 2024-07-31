import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import Header from "../components/Header";

function Home() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postInfo, setPostInfo] = useState(null);
  const [activeTab, setActiveTab] = useState("edit"); // 'edit' or 'preview'

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/post", {
        title,
        content,
      });
      setPostInfo(response.data);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <main className="md:w-[800px] md:mx-auto mt-4">
      <Header />
      <section className="m-8">
        <div className="flex mb-4">
          <button
            className={`flex-1 py-1 rounded-l-lg ${
              activeTab === "edit" ? "bg-red-400 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("edit")}
          >
            edit
          </button>
          <button
            className={`flex-1 py-1 rounded-r-lg ${
              activeTab === "preview" ? "bg-red-400 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("preview")}
          >
            preview
          </button>
        </div>

        {activeTab === "edit" ? (
          <main>
            <input
              type="text"
              placeholder="title"
              className="outline-none border border-solid border-zinc-600 w-full my-2 rounded-lg py-1 px-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              name="input"
              placeholder="body"
              id="post"
              className="border border-solid border-zinc-600 w-full h-64 p-2 outline-none rounded-lg"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div>
              <button
                className="bg-red-400 w-full mt-2 py-2 rounded-lg text-white font-semibold"
                onClick={handleSubmit}
              >
                create post
              </button>
            </div>
          </main>
        ) : (
          <div className="border border-solid border-zinc-600 rounded-lg p-4">
            <h1 className="text-2xl font-bold mb-4">{title}</h1>
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        )}

        {postInfo && (
          <div className="mt-4 p-4 bg-green-100 rounded-lg">
            <p className="text-green-800">post created successfully!</p>
            <p className="text-green-800">
              URL:{" "}
              <a href={`/post/${postInfo.id}`} className="underline">
                /post/{postInfo.id}
              </a>
            </p>
            <p className="text-green-800">private key: {postInfo.privateKey}</p>
          </div>
        )}
      </section>
    </main>
  );
}

export default Home;
