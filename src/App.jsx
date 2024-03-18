import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [api, setApi] = useState([]);
  const [postApi, setPostApi] = useState([]);

  const handleInput = (e) => {
    setPostApi({ ...postApi, [e.target.name]: e.target.value });
  };

  const url = "https://test-mongo-1.onrender.com/comments"

  const handleSubmit = (e) => {
    axios
      .post(url, postApi)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(url)
      .then((res) => setApi(res.data))
      .catch((err) => console.log(err));
      // console.log(api);
  }, []);
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleInput} name="comment" placeholder="comment" id="" />
        <button>Submit</button>
      </form>
      <button onClick={() => window.location.reload()}>Reload</button>
      <div>
        {api.map((item, index) => {
          return (
            <div key={index}>
              <p>{item.comment}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
