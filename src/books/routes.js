const { Router } = require("express");
const controller = require('./controller');
const router = Router();

router.get("/" + "genres", controller.getGenres);
router.get("/" + "formats", controller.getFormats);
router.get("/" + "languages", controller.getLanguages);
router.get("/:isbn", controller.getABookByISBN);

router.post("/", controller.addABook);
router.post("/" + "book_genre", controller.addOneBookGenre);
router.post("/" + "book_publisher", controller.addOneBookPublisher);
router.post("/" + "book_author", controller.addOneBookAuthor);

router.delete("/:isbn", controller.deleteABookByIsbn);

module.exports = router;