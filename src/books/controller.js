const pool = require('../../db');
const queries = require('./queries');

const getGenres = (req, res) => {
    pool.query(queries.getGenres, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};
const getFormats = (req, res) => {
    pool.query(queries.getFormats, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const getLanguages = (req, res) => {
    pool.query(queries.getLanguages, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const getGenresByBookid = (req, res) => {
    const id = req.params.id;
    pool.query(queries.getGenresByBookid, [id], (error, results) => {
        if (error) throw error;
        if (!results.rows.length) {
            return res.send("Nothing found associated with this book.");
        }
        res.status(200).json(results.rows);
    });
};

const getPublishersByBookid = (req, res) => {
    const id = req.params.id;
    pool.query(queries.getPublishersByBookid, [id], (error, results) => {
        if (error) throw error;
        if (!results.rows.length) {
            return res.send("Nothing found associated with this book.");
        }
        res.status(200).json(results.rows);
    });
};

const getAuthorsByBookid = (req, res) => {
    const id = req.params.id;
    pool.query(queries.getAuthorsByBookid, [id], (error, results) => {
        if (error) throw error;
        if (!results.rows.length) {
            return res.send("Nothing found associated with this book.");
        }
        res.status(200).json(results.rows);
    });
};

const getABookByISBN = (req, res) => {
    const isbn = req.params.isbn;
    pool.query(queries.getABookByISBN, [isbn], (error, results) => {
        if (error) throw error;
        if (!results.rows.length) {
            return res.send("ISBN doesn't exist.");
        }
        res.status(200).json(results.rows);
    });
};

const addABook = (req, res) => {
    const {title, isbn, publication_date, language, format, edition, description} = req.body;
   
    // check if isbn exists
    pool.query(queries.getABookByISBN, [isbn], (error, results) => {
        if (results.rows.length) {
            return res.send("ISBN already exists.");
        }

        // add a book 
        pool.query(
            queries.addABook, 
            [title, isbn, publication_date, language, format, edition, description], 
            (error, results) => {
                if (error) throw error;
                res.status(201).send("Book created successfully");
                // console.log();
        });
    });
};

const addOneBookGenre = (req, res) => {
    const {book_id, genre} = req.body;
    pool.query(
        queries.addOneBookGenre, 
        [book_id, genre], 
        (error, results) => {
            if (error) throw error;
            res.status(201).send("book_id: " + book_id + " with genre: " + genre + " created successfully");
            // console.log();
    });
};

const addOneBookPublisher = (req, res) => {
    const {book_id, publisher} = req.body;
    pool.query(
        queries.addOneBookPublisher, 
        [book_id, publisher], 
        (error, results) => {
            if (error) throw error;
            res.status(201).send("book_id: " + book_id + " with publisher: " + publisher + " created successfully");
            // console.log();
    });
};

const addOneBookAuthor = (req, res) => {
    const {book_id, author} = req.body;
    pool.query(
        queries.addOneBookAuthor, 
        [book_id, author], 
        (error, results) => {
            if (error) throw error;
            res.status(201).send("book_id: " + book_id + " with author: " + author + " created successfully");
            // console.log();
    });
};

const deleteABookByIsbn = (req, res) => {
    const isbn = req.params.isbn;

    pool.query(queries.getBookIdByISBN, [isbn], (error, results) => {
        if (error) throw error;
        if (!results.rows.length) {
            return res.send("Book with this ISBN: " + isbn + " doesn't exist.");
        }

        // console.log(results.rows[0].id);
        // res.send("book id is " + results.rows[0].id);
        const book_id = results.rows[0].id;

        pool.query(queries.deleteBookGenres, [book_id], (error, results) => {
            if (error) throw error;
        });

        pool.query(queries.deleteBookPublishers, [book_id], (error, results) => {
            if (error) throw error;
        });

        pool.query(queries.deleteBookAuthors, [book_id], (error, results) => {
            if (error) throw error;
        });

        pool.query(queries.deleteABookByIsbn, [isbn], (error, results) => {
            if (error) throw error;
            res.status(200).send("Book with ISBN: " + isbn + " is deleted.");
        });
    });
};

// const searchBooks = (req, res) => {
//     try {
//         const page = parseInt(req.query.page) - 1 || 0;
//         const limit = parseInt(req.query.limit) || 5;
//         const search = req.query.search || "";
//         let sort = req.query.sort || "id";
//         let genre = req.query.genre || "All";

//         pool.query(queries.getGenres, (error, results) => {
//             if (error) throw error;
//             res.status(200).json(results.rows);
//         });

//         genre === "All"
//                 ? (genre = )
//                 : (genre = req.query.genre.split(","));
                
//         req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

//         let sortBy = {};
//         if (sort[1]) {
//             sortBy[sort[0]] = sort[1];
//         } else {
//             sortBy[sort[0]] = "asc";
//         }
        
//         const movies = await Movie.find({ name: { $regex: search, $options: "i" } })
//                 .where("genre")
//                 .in([...genre])
//                 .sort(sortBy)
//                 .skip(page * limit)
//                 .limit(limit);
        
//         const total = await Movie.countDocuments({
//             genre: { $in: [...genre] },
//             name: { $regex: search, $options: "i" },
//         });
        
//         const response = {
//             error: false,
//             total,
//             page: page + 1,
//             limit,
//             genres: genreOptions,
//             movies,
//         };
        
//         res.status(200).json(response);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({error: true, message: "Internal Server Error"});
//     }
// };

module.exports = {
    getGenres,
    getFormats,
    getLanguages,
    getGenresByBookid,
    getPublishersByBookid,
    getAuthorsByBookid,
    getABookByISBN,
    addABook,
    addOneBookGenre,
    addOneBookPublisher,
    addOneBookAuthor,
    deleteABookByIsbn,
    // searchBooks,
}

