const getGenres = "SELECT to_json(enum_range(NULL::genres)) as genres";
const getFormats = "SELECT to_json(enum_range(NULL::formats)) as formats";
const getLanguages = "SELECT to_json(enum_range(NULL::languages)) as languages";
const getABookByISBN = "SELECT * FROM books WHERE isbn = $1";
const getBookIdByISBN = "SELECT id FROM books WHERE isbn = $1";

const addABook = "INSERT INTO books (title, isbn, publication_date, language, format, edition, description) VALUES ($1, $2, $3, $4, $5, $6, $7)";
const addOneBookGenre = "INSERT INTO books_genres (book_id, genre) VALUES ($1, $2)";
const addOneBookPublisher = "INSERT INTO books_publishers (book_id, publisher) VALUES ($1, $2)";
const addOneBookAuthor = "INSERT INTO books_authors (book_id, author) VALUES ($1, $2)";

const deleteABookByIsbn = "DELETE FROM books WHERE isbn = $1";
const deleteBookGenres = "DELETE FROM books_genres WHERE book_id = $1";
const deleteBookPublishers = "DELETE FROM books_publishers WHERE book_id = $1";
const deleteBookAuthors = "DELETE FROM books_authors WHERE book_id = $1";


module.exports = {
    getGenres,
    getFormats,
    getLanguages,
    getABookByISBN,
    getBookIdByISBN,
    addABook,
    addOneBookGenre,
    addOneBookPublisher,
    addOneBookAuthor,
    deleteABookByIsbn,
    deleteBookGenres,
    deleteBookPublishers,
    deleteBookAuthors,
};