import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../redux/todosSlice";
import Spinner from "./Spinner";

const CreatePost = () => {
  const [values, setValues] = useState({ title: "", body: "" });
  const [showPost, setShowPost] = useState(false)

  const {loading,post } = useSelector(state =>({...state.store}))
  const { title, body } = values;
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleSubmit = (e) =>{
    e.preventDefault()
    dispatch(createPost({values}))
    setValues({title:'',body:''})
    setShowPost(true)
  }

  const showcreatedpost = () =>{

    return(
      <> 
            {loading ?<Spinner /> : (
      
                <div className="card mt-4">
                  <div className="card-body">
                    <h5 className="card-title">{post[0].title}</h5>
                <p className="card-text">{post[0].body}</p>
                </div>
              </div>
       )}
    </>
    )
  }
  

  return (
    <div>
      <h1>CreatePost</h1>
      <form action="">
        <div className="mb-3 mt-4">
          <input
            type="text"
            placeholder="Enter the title"
            value={title}
            onChange={(e) => setValues({ ...values, title: e.target.value })}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="form-floating">
          <textarea
            className="form-control"
            placeholder="add description"
            value={body}
            onChange={(e) => setValues({ ...values, body: e.target.value })}
            id="floatingTextarea"
          ></textarea>
          <label for="floatingTextarea">add description</label>
        </div>
        <div className="mt-4">
          <button
            className="btn btn-primary mx-2"
            onClick={() => navigate("/")}
          >
            Home
          </button>
          <button
            className="btn btn-primary"
            type="submit"
            onClick={handleSubmit}
          >
            Submit Post
          </button>
        </div>
      </form>
      <div className="mt-4">
        {showPost &&  <div>{showcreatedpost()} </div>}
      </div>
    </div>
  );
};

export default CreatePost;
