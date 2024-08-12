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
          if (book.shelf === CATEGORIES.CURRENTLY_READING.shelf) {
            currentlyReadingShelfApiData.push(book);
          }

          if (book.shelf === CATEGORIES.WANT_TO_READ.shelf) {
            wantToReadShelfApiData.push(book);
          }

          if (book.shelf === CATEGORIES.READ.shelf) {
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

  const moveBook = async (book, shelf) => {
    const res = await BooksAPI.update(book, shelf);
    if (!Object.keys(res).length) {
      return;
    }

    // Remove book from source shelf
    if (book.shelf === CATEGORIES.CURRENTLY_READING.shelf) {
      setCurrentlyReadingBooks(
        currentlyReadingBooks.filter(
          (currentlyReadingBook) => currentlyReadingBook.id !== book.id
        )
      );
    }

    if (book.shelf === CATEGORIES.WANT_TO_READ.shelf) {
      setWantToReadBooks(
        wantToReadBooks.filter(
          (wantToReadBook) => wantToReadBook.id !== book.id
        )
      );
    }

    if (book.shelf === CATEGORIES.READ.shelf) {
      setReadBooks(readBooks.filter((readBook) => readBook.id !== book.id));
    }

    // Add new book to destination shelf
    if (shelf === CATEGORIES.CURRENTLY_READING.shelf) {
      setCurrentlyReadingBooks([...currentlyReadingBooks, book]);
    }

    if (shelf === CATEGORIES.WANT_TO_READ.shelf) {
      setWantToReadBooks([...wantToReadBooks, book]);
    }

    if (shelf === CATEGORIES.READ.shelf) {
      setReadBooks([...readBooks, book]);
    }
  };

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <BookShelf
          title={CATEGORIES.CURRENTLY_READING.title}
          books={currentlyReadingBooks}
          moveBook={moveBook}
        />
        <BookShelf
          title={CATEGORIES.WANT_TO_READ.title}
          books={wantToReadBooks}
          moveBook={moveBook}
        />
        <BookShelf
          title={CATEGORIES.READ.title}
          books={readBooks}
          moveBook={moveBook}
        />
      </div>

      <Link className="open-search" to="/search">
        Add a book
      </Link>
    </div>
  );
}

export default BookShelves;
