import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function App() {
  const [api, setApi] = useState([]);
  const [postApi, setPostApi] = useState([]);
  // const [changeComment, setChangeComment] = useState({
  //   comment: ""
  // });
  // const [active, setActive] = useState();

  // console.log(changeComment);
  // const { id } = useParams();

  // const Openmodal = () => {
  //   setActive(true);
  // };

  // const Closemodal = () => {
  //   setActive(false);
  // };

  const handleInput = (e) => {
    setPostApi({ ...postApi, [e.target.name]: e.target.value });
  };

  // const handleChangeInput = (e) => {
  //   setChangeComment({ ...changeComment, [e.target.name]: e.target.value });
  // };

  const API = axios.create({
    baseURL: "https://test-mongo-1.onrender.com/",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    API.post("/comments", postApi)
      .then((res) => {
        alert(res.data.message);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const handleChangeSubmit = (e) => {
  //   e.preventDefault();
  //   API.put("/put-comment/" + id, {...changeComment})
  //     .then((res) => {
  //       alert(res.data.message);
  //       window.location.reload();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const handleDelete = (id) => {
    API.post("/del-comment/" + id)
      .then((res) => {
        alert(res.data.message);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteAll = () => {
    API.post("/delete").then((res) => {
      alert(res.data.message)
      window.location.reload()
    }).catch((err) => {
      console.log(err)
    })
  }

    API.get("/comments")
      .then((res) => setApi(res.data))
      .catch((err) => console.log(err));
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleInput}
          name="comment"
          placeholder="comment"
          id=""
        />
        <button>Submit</button>
      </form>
      <button onClick={() => window.location.reload()}>Reload</button>
      <button onClick={() => handleDeleteAll()}>delete all</button>
      <div>
        {api.map((item, index) => {
          return (
            <div key={index}>
              <div>
                <p>{item.comment}</p>
                <button onClick={() => handleDelete(item._id)}>del</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
