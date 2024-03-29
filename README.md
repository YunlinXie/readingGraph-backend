# readingGraph-backend
Providing apis for a book reviewing web application. 
Implementes using node.js, express, postgeSQL
## Database & Tables & Enums:
### genres (enum):
query:
create type genres as enum ('Science Fiction', 'Romance', 'Historical Fiction', 'Fiction', 'Fantasy', 'Action & Adventure', 'Paranormal Romance', 'Computer Science', 'Programming', 'Algorithms', 'Technology', 'Nonfiction');

### formats (enum):
query:
create type formats as enum ('Hardcopy', 'Paperback');

### languages (enum):
query:
create type languages as enum ('English', 'Chinese', 'Spanish', 'Japanese', 'Korean', 'Hindi', 'French', 'Russian', 'Bengali', 'Arabic');

### books:
create table books (<br />
  -id serial primary key,<br />
  -title varchar(500) not null,<br />
  -isbn varchar(25) not null,<br />
  -publication_date date,<br />
  -language languages,<br />
  -format formats,<br />
  -edition varchar(500),<br />
  -description varchar(5000) not null,<br />
  -unique(isbn)<br />
);<br />
<br />

### books_genres:
create table books_genres (<br />
  -id serial primary key,<br />  
  -book_id integer references books (id) not null,<br />
  -genre genres not null,<br />
  -unique(book_id, genre)<br />
);<br />
<br />

### books_publishers:
create table books_publishers (<br />
  -id serial primary key,<br />
  -book_id integer references books (id) not null,<br />
  -publisher varchar(200) not null,<br />
  -unique(book_id, publisher)<br />
);<br />
<br />

### books_authors:
create table books_authors (<br />
  -id serial primary key,<br />
  -book_id integer references books (id)not null,<br />
  -author varchar(200)not null,<br />
  -unique(book_id, author)<br />
);_<br />
<br />

## Books APIs:
### get: /api/v1/books/genres:
get all genres (enum type) in database<br />
return:<br />
_[<br />
    -{<br />
        -“genres”: [<br />
            -“Science Fiction”,<br />
            -“Romance”,<br />
            -……<br />
        -]<br />
    -}<br />
]_<br />
<br />

### get: /api/v1/books/formats:
get all formats (enum type) in database<br />
return:<br />
_[<br />
    -{<br />
        -“formats”: [<br />
            -“Hardcopy”,<br />
            -“paperback”<br />
        -]<br />
    -}<br />
]_<br />
<br />

### get: /api/v1/books/languages:
get all languages (enum type) in database
return:
_[
    -{
        -“languages”: [
            -“English”,
            -“Chines”,
            -……
        -]
    -}
]_

### get: /api/v1/books/genres/:id:
get all genres associated with given book id<br />
return:<br />
_[<br />
   -{<br />
       -"genre": "Romance"<br />
   -},<br />
   -{<br />
       -"genre": "Science Fiction"<br />
   -},<br />
   -{<br />
       -"genre": "Fiction"<br />
   -},<br />
   -{<br />
       -"genre": "Fantasy"<br />
   -},<br />
   -{<br />
       -"genre": "Paranormal Romance"<br />
   -}<br />
]_<br />
<br />

### get: /api/v1/books/publishers/:id:
get all publishers associated with given book id<br />
return:<br />
_[<br />
   -{<br />
       -"publisher": "Tor Publishing Group"<br />
   -}<br />
]_<br />
<br />

### get: /api/v1/books/authors/:id:
get all authors associated with given book id<br />
return:<br />
_[<br />
   -{<br />
       -"author": "Thomas H. Cormen"<br />
   -},<br />
   -{<br />
       -"author": "Charles E. Leiserson"<br />
   -},<br />
   -{<br />
       -"author": "Ronald L. Rivest"<br />
   -},<br />
   -{<br />
       -"author": "Clifford Stein"<br />
   -}<br />
]_<br />
<br />

### get: /api/v1/books/:isbn:
get a book by its isbn<br />
return:<br />
_[<br />
   -{<br />
       -"id": 1,<br />
       -"title": "The Songbird and the Heart of Stone",<br />
       -"isbn": "9781250379146",<br />
       -"publication_date": "2024-11-19T08:00:00.000Z",<br />
       -"language": "English",<br />
       -"format": "Hardcopy",<br />
       -"edition": "Signed Edition",<br />
       -"description": "M………………”<br />
    -}<br />
]_<br />
<br />

### post: /api/v1/books/:
params: <br />
_{title, isbn, publication_date, language, format, edition, description}_<br />
add a book to books table<br />
<br />

### post: /api/v1/books/book_genres:
params: <br />
_{book_id, [genre1, genre2, genre3……]}_<br />
add all genres belongs to a book to books_genres table<br />
<br />

### post: /api/v1/books/book_publishers:
params: <br />
_{book_id, [publisher1, publisher2, publisher3……]}_<br />
add all genres belongs to a book to books_genres table<br />
<br />

### post: /api/v1/books/book_authors:
params: <br />
_{book_id, [author1, author2, author3……]}_<br />
add all genres belongs to a book to books_genres table<br />
<br />

### delete: /api/v1/books/:isbn:
if a book wiht given isbn exists, delete genres, publishers, and authors associated with this book_id, then delete the book with {isbn}
