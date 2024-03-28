# readingGraph-backend
Providing apis for a book reviewing web application. 
Implementes using node.js, express, postgeSQL
# Database & Tables & Enums:
genres (enum):
query:
create type genres as enum ('Science Fiction', 'Romance', 'Historical Fiction', 'Fiction', 'Fantasy', 'Action & Adventure', 'Paranormal Romance', 'Computer Science', 'Programming', 'Algorithms', 'Technology', 'Nonfiction');

formats (enum):
query:
create type formats as enum ('Hardcopy', 'Paperback');

languages (enum):
query:
create type languages as enum ('English', 'Chinese', 'Spanish', 'Japanese', 'Korean', 'Hindi', 'French', 'Russian', 'Bengali', 'Arabic');

books:
create table books (
id serial primary key,
title varchar(500) not null,
isbn varchar(25) not null,
publication_date date,
language languages,
format formats,
edition varchar(500),
description varchar(5000) not null,
unique(isbn)
);

books_genres:
create table books_genres (
id serial primary key,
book_id integer references books (id) not null,
genre genres not null,
unique(book_id, genre)
);

books_publishers:
create table books_publishers (
id serial primary key,
book_id integer references books (id) not null,
publisher varchar(200) not null,
unique(book_id, publisher)
);

books_authors:
create table books_authors (
id serial primary key,
book_id integer references books (id)not null,
author varchar(200)not null,
unique(book_id, author)
);

# Books APIs:
get: /api/v1/books/genres:
get all genres (enum type) in database
return:
[
    {
        “genres”: [
            “Science Fiction”,
            “Romance”,
            ……
        ]
    }
]

get: /api/v1/books/formats:
get all formats (enum type) in database
return:
[
    {
        “formats”: [
            “Hardcopy”,
            “paperback”
        ]
    }
]

get: /api/v1/books/languages:
get all languages (enum type) in database
return:
[
    {
        “languages”: [
            “English”,
            “Chines”,
            ……
        ]
    }
]

get: /api/v1/books/genres/:id:
get all genres associated with given book id
return:
[
   {
       "genre": "Romance"
   },
   {
       "genre": "Science Fiction"
   },
   {
       "genre": "Fiction"
   },
   {
       "genre": "Fantasy"
   },
   {
       "genre": "Paranormal Romance"
   }
]

get: /api/v1/books/publishers/:id:
get all publishers associated with given book id
return:
[
   {
       "publisher": "Tor Publishing Group"
   }
]

get: /api/v1/books/authors/:id:
get all authors associated with given book id
return:
[
   {
       "author": "Thomas H. Cormen"
   },
   {
       "author": "Charles E. Leiserson"
   },
   {
       "author": "Ronald L. Rivest"
   },
   {
       "author": "Clifford Stein"
   }
]

get: /api/v1/books/:isbn:
get a book by its isbn
return:
[
   {
       "id": 1,
       "title": "The Songbird and the Heart of Stone",
       "isbn": "9781250379146",
       "publication_date": "2024-11-19T08:00:00.000Z",
       "language": "English",
       "format": "Hardcopy",
       "edition": "Signed Edition",
       "description": "M………………”
    }
]

post: /api/v1/books/:
params: {title, isbn, publication_date, language, format, edition, description}
add a book to books table

post: /api/v1/books/book_genres:
params: {book_id, [genre1, genre2, genre3……]}
add all genres belongs to a book to books_genres table

post: /api/v1/books/book_publishers:
params: {book_id, [publisher1, publisher2, publisher3……]}
add all genres belongs to a book to books_genres table

post: /api/v1/books/book_authors:
params: {book_id, [author1, author2, author3……]}
add all genres belongs to a book to books_genres table

delete: /api/v1/books/:isbn:
if a book wiht given isbn exists, delete genres, publishers, and authors associated with this book_id, then delete the book with {isbn}
