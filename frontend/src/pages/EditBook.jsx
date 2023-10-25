import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((res) => {
        setTitle(res?.data?.data?.title);
        setAuthor(res?.data?.data?.author);
        setPublishYear(res?.data?.data?.publishYear);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        alert("something went wrong please check console");
        console.log(err);
      });
  }, []);
  const navigate = useNavigate();
  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        setLoading(false);
        alert("Book updated successfully");
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        alert("Something went wrong Please try again or check console");
        console.log(error);
      });
  };
  return (
    <div className="p-4">
      <BackButton />
      <h2 className="text-3xl my-4">Update Book</h2>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-400">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-400">Author</label>
            <input
              type="text"
              className="border-2 border-gray-500 px-4 py-2 w-full"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-400">Publish Year</label>
            <input
              type="number"
              value={publishYear}
              className="border-2 border-gray-500 px-4 py-2 w-full"
              onChange={(e) => setPublishYear(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="p-2 bg-sky-300 m-8"
            onClick={handleEditBook}
          >
            Update Book
          </button>
        </div>
      )}
    </div>
  );
};

export default EditBook;
