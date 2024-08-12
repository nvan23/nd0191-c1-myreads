import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import * as BooksAPI from "../BooksAPI";
import BookShelf from "./BookShelf";
import { CATEGORIES } from "../constants/categories.constants";

function BookShelves() {
  const [currentlyReadingBooks, setCurrentlyReadingBooks] = useState([]);
  const [wantToReadBooks, setWantToReadBooks] = useState([]);
  const [readBooks, setReadBooks] = useState([]);

  useEffect(() => {
    const getAllBooks = async () => {
      const res = await BooksAPI.getAll();
      console.log(res);
      const currentlyReadingShelfApiData = [];
      const wantToReadShelfApiData = [];
      const readShelfApiData = [];

      if (res?.length) {
        res.forEach((book) => {
          if (book.shelf === "currentlyReading") {
            currentlyReadingShelfApiData.push(book);
          }

          if (book.shelf === "wantToRead") {
            wantToReadShelfApiData.push(book);
          }

          if (book.shelf === "read") {
            readShelfApiData.push(book);
          }
        });

        setCurrentlyReadingBooks(currentlyReadingShelfApiData);
        setWantToReadBooks(wantToReadShelfApiData);
        setReadBooks(readShelfApiData);
      }
    };

    getAllBooks();
  }, []);

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <BookShelf
          title={CATEGORIES.CURRENTLY_READING}
          books={currentlyReadingBooks}
        />
        <BookShelf title={CATEGORIES.WANT_TO_READ} books={wantToReadBooks} />
        <BookShelf title={CATEGORIES.READ} books={readBooks} />
      </div>

      <Link className="open-search" to="/search">
        Add a book
      </Link>
    </div>
  );
}

export default BookShelves;
