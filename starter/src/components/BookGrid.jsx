function BookGrid({ books, moveBook }) {
  const handleBookShelfChange = (event, book) => {
    const selectedValue = event.target.value;

    if (book.shelf !== selectedValue) {
      moveBook(book, selectedValue);
    }
  };

  return (
    <ol className="books-grid">
      {books.map((book) => (
        <li key={book.title}>
          <div className="book">
            <div className="book-top">
              <div
                className="book-cover"
                style={{
                  width: 128,
                  height: 193,
                  backgroundImage: `url("${book.imageLinks.thumbnail}")`,
                }}
              ></div>
              <div className="book-shelf-changer">
                <select
                  value="none"
                  onChange={(event) => handleBookShelfChange(event, book)}
                >
                  <option value="none" disabled>
                    Move to...
                  </option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{book.title}</div>
            {book.authors.map((author) => (
              <div className="book-authors" key={author}>
                {author}
              </div>
            ))}
          </div>
        </li>
      ))}
    </ol>
  );
}

export default BookGrid;
