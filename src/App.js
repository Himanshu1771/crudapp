import { Routes, Route } from "react-router-dom";
import Posts from "./components/Post";
import CreatePost from "./components/CreatePost";
import Header from "./components/Header";
function App() {
  return (
    <>
    <Header/>
      <div className="container">
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/createpost" element={<CreatePost />} />
        </Routes>
      </div>
    </>
  );
}

export default App;