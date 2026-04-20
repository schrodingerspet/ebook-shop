import Book from '../models/Book.js';

export const getBooks = async (req, res) => {
    const books = await Book.find({});
    return res.json(books);
};

export const getBookById = async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book) {
        return res.status(404).json({ message: "book not found" });
    }
    return res.json(book);
};

export const deleteBook = async (req, res) => {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
        return res.status(404).json({ message: "book not found" });
    }
    return res.json(book);
};

export const createBook = async (req, res) => {
    const { title, author, price, image, description, category, stock, pdfUrl, preview, summary } = req.body;
    const book = await Book.create({
        title,
        author,
        price,
        image,
        description,
        category,
        stock,
        pdfUrl,
        preview,
        summary
    });
    return res.status(201).json(book);
};

export const updateBook = async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book) {
        return res.status(404).json({ message: "book not found" });
    }

    book.title = req.body.title ?? book.title;
    book.author = req.body.author ?? book.author;
    book.price = req.body.price ?? book.price;
    book.description = req.body.description ?? book.description;
    book.category = req.body.category ?? book.category;
    book.stock = req.body.stock ?? book.stock;
    book.pdfUrl = req.body.pdfUrl ?? book.pdfUrl;
    book.preview = req.body.preview ?? book.preview;
    book.summary = req.body.summary ?? book.summary;

    const updatedBook = await book.save();
    return res.json(updatedBook);
};

export const uploadImage = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "image is required" });
    }

    return res.status(201).json({
        url: req.file.path,
        public_id: req.file.filename
    });
};
