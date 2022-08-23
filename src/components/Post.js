import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deletePost, getPost, setEdit, updatePost } from "../redux/todosSlice";
import Spinner from "./Spinner";

const Posts = () => {
  const [id, setId] = useState("");
  const [editbody, setEditbody] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, post, body, edit } = useSelector((state) => ({ ...state.store }));

  useEffect(() => {
    if (body) {
      setEditbody(body);
    }
  }, [body]);

  const handleFetchData = (e) => {
    e.preventDefault();
    if (!id || id > 100) {
      window.alert("Please Provide validPost ID");
    } else {
      dispatch(getPost({ id }));
      setId("");
    }
  };

  const handleDelete = ({ id }) => {
    dispatch(deletePost({ id: post[0].id }));

  };

  return (
    <>
      <div className="row mt-4 d-flex align-items-center justify-content-center">
        <div className="col-md-8">
          <form action="">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                <h2> Search By ID:</h2>
              </label>
              <input
                type="number"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <button
              onClick={handleFetchData}
              type="submit"
              className="btn btn-primary"
            >
              Fetch Post
            </button>
            <button
              onClick={() => navigate("/createpost")}
              type="button"
              className="btn btn-warning ms-4"
            >
              create post
            </button>
          </form>
        </div>
      </div>

      <div className="container">
        {loading ? (
          <Spinner />
        ) : (
          <>
            {post.length > 0 && (
              <>
                <div className="card mt-4">
                  <div className="card-body">
                    <h5 className="card-title">{post[0].title}</h5>
                    {edit ? (
                      <>
                        <textarea
                          className="form-control"
                          value={editbody}
                          onChange={(e) => setEditbody(e.target.value)}
                          id="floatingTextarea"
                        ></textarea>
                        <button
                          className="btn btn-primary mx-2"
                          onClick={() => {
                            dispatch(
                              updatePost({
                                id: post[0].id,
                                title: post[0].title,
                                body: editbody,
                              })
                            );
                            dispatch(setEdit({ edit: false, body: "" }));
                          }}
                        >
                          save
                        </button>
                        <button
                          className="btn btn-primary"
                          onClick={() =>
                            dispatch(setEdit({ edit: false, body: "" }))
                          }
                        >
                          cancle
                        </button>
                      </>
                    ) : (
                      <>
                        <p className="card-text">{post[0].body}</p>
                      </>
                    )}
                    {!edit && (
                      <div>
                        <button
                          className="btn btn-primary mx-2"
                          onClick={() =>
                            dispatch(
                              setEdit({ edit: true, body: post[0].body })
                            )
                          }
                        >
                          edit
                        </button>
                        <button
                          className="btn btn-primary"
                          onClick={handleDelete}
                        >
                          delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Posts;
