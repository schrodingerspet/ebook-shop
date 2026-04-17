import express from 'express';
import upload from '../middleware/uploadMIddleware.js';
import { getBooks, getBookById, deletBooks, createBook, updateBook, uploadImage } from '../controllers/bookController.js';

const router = express.Router();

router.get("/", getBooks);
router.get("/:id", getBookById);
router.delete("/:id", deletBooks);
router.post("/", createBook);
router.put("/:id", updateBook);
router.post("/upload", upload.single("image"), uploadImage);
export default router;