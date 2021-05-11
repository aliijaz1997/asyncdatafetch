import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import * as agent from "./components/agent";
import shortid from "shortid";

function App() {
  const [posts, setPosts] = useState([]);
  const [_title, setTitle] = useState("");
  const [_author, setAuthor] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8000/posts").then((res) => {
      console.log(res.data);
      setPosts(res.data);
    });
  }, []);
  const handleAdd = () => {
    const newPost = {
      id: shortid.generate(),
      title: _title,
      author: _author,
    };

    agent.createPost(newPost).then((res) => {
      setPosts([...posts, res]);
    });
    setTitle("");
    setAuthor("");
  };
  const handleDelete = (id) => {
    agent
      .deletePost(id)
      .then((res) => {
        setPosts(posts.filter((data) => data.id !== id));
      })
      .catch((error) => console.log(error, "Error occured"));
  };
  return (
    <div className="flex flex-col items-center p-2 ">
      <input
        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight mb-3 focus:outline-none focus:bg-white focus:border-purple-500"
        type="text"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        id="title"
        placeholder="Enter title"
      />
      <input
        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
        type="text"
        onChange={(e) => {
          setAuthor(e.target.value);
        }}
        id="author"
        placeholder="Enter author"
      />
      <button
        className="shadow bg-gray-500 hover:bg-grey-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mt-3"
        onClick={handleAdd}
      >
        Add post
      </button>
      {posts.map((res) => (
        <div
          className="flex p-3 mt-3 justify-around bg-gray-100 w-72 h-24 rounded overflow-hidden shadow-lg"
          key={res.id}
        >
          <div>
            <h3 className="font-bold text-xl">{res.title}</h3>
            <p>{res.author}</p>
          </div>
          <button
            className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white px-4 border border-red-500 hover:border-transparent rounded h-7"
            onClick={() => {
              handleDelete(res.id);
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
