const { Router } = require("express");
const controller = require('./controller');
const router = Router();

// search api with filters, sorting and pagination
// router.get("/" + "search", controller.searchBooks);

router.get("/" + "genres", controller.getGenres);
router.get("/" + "formats", controller.getFormats)
router.get("/" + "languages", controller.getLanguages);

router.get("/" + "genres/:id", controller.getGenresByBookid);
router.get("/" + "publishers/:id", controller.getPublishersByBookid)
router.get("/" + "authors/:id", controller.getAuthorsByBookid);
router.get("/:isbn", controller.getABookByISBN);

router.post("/", controller.addABook);
router.post("/" + "book_genre", controller.addOneBookGenre);
router.post("/" + "book_publisher", controller.addOneBookPublisher);
router.post("/" + "book_author", controller.addOneBookAuthor);

router.delete("/:isbn", controller.deleteABookByIsbn);

module.exports = router;