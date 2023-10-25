import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDelete = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        alert("Book deleted successfully");
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        alert("Something went wrong deleting the book Please check console");
        console.log(err);
      });
  };
  return (
    <div className="p-4">
      <BackButton />
      <h2 className="text-3xl my-4">DeleteBook</h2>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
          <h3 className="text-2xl ">
            Are you sure you want to delete this book ?
          </h3>
          <button
            className="bg-red-600 p-4 text-white m-8 w-full"
            onClick={handleDelete}
          >
            Yes , DeleteBook !
          </button>
        </div>
      )}
    </div>
  );
};

export default DeleteBook;
