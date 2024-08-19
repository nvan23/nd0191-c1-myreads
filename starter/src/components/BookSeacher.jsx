import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import * as BooksAPI from "../BooksAPI";
import BookGrid from "./BookGrid";

function BookSearcher() {
  const [searchKey, setSearchKey] = useState("");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooksBySearchKey = async () => {
      const myBookRes = await BooksAPI.getAll();
      const myBookIds = myBookRes.map((book) => book.id);

      const searchRes = await BooksAPI.search(searchKey, 20);
      if (searchRes?.length) {
        setBooks(
          searchRes?.filter((book) => !myBookIds.includes(book.id)) || []
        );
      }
    };

    if (searchKey) {
      getBooksBySearchKey();
    }
  }, [searchKey]);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchKey(value);

    console.log(`Input Value: ${value}`);
  };

  const moveBook = async (book, shelf) => {
    const res = await BooksAPI.update(book, shelf);
    if (!Object.keys(res).length) {
      return;
    }

    setBooks(books.filter((bookItem) => bookItem.id !== book.id));
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={searchKey}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="search-books-results">
        <BookGrid books={books} moveBook={moveBook} />
      </div>
    </div>
  );
}

export default BookSearcher;
