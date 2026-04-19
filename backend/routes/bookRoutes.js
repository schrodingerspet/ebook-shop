import express from 'express';
import upload from '../middleware/uploadMIddleware.js';
import { getBooks, getBookById, deleteBook, createBook, updateBook, uploadImage } from '../controllers/bookController.js';

const router = express.Router();

router.get("/", getBooks);
router.get("/:id", getBookById);
router.delete("/:id", deleteBook);
router.post("/", createBook);
router.put("/:id", updateBook);
router.post("/upload", upload.single("image"), uploadImage);
export default router;
