import { Routes, Route } from "react-router-dom";
import "../App.css";

import BookShelves from "./BookShelves";
import BookSearcher from "./BookSeacher";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<BookShelves></BookShelves>} />
        <Route exact path="/search" element={<BookSearcher></BookSearcher>} />
      </Routes>
    </div>
  );
}

export default App;
