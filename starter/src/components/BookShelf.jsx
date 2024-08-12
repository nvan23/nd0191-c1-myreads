import BookGrid from "./BookGrid";

function BookShelf({ title, books, moveBook }) {
  return (
    <div className="bookshelf" key={title}>
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <BookGrid books={books} moveBook={moveBook} />
      </div>
    </div>
  );
}

export default BookShelf;
