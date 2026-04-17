import Book from '../models/Book.js';

export const getBooks = async (req, res) => {
    const Books = await Book.find({});
    res.json(Books);
}

export const getBookById = async (req, res) => {
    const Books = await Book.findById(req.params.id);
    res.json(Books);
}

export const deletBooks = async (req, res) => {
    const Books = await Book.findByIdAndDelete(req.params.id);
    res.json(Books);
}

export const createBook = async (req, res) => {
    const { title, author, price, description, category, stock, pdfUrl, preview, summary } = req.body;
    const book = await Book.create({
        title,
        author,
        price,
        description,
        category,
        stock,
        pdfUrl,
        preview,
        summary
    });
    res.json(book);
}
export const updateBook = async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (book) {
        book.title = req.body.title || book.title;
        book.author = req.body.author || book.author;
        book.price = req.body.price || book.price;
        book.description = req.body.description || book.description;
        book.category = req.body.category || book.category;
        book.stock = req.body.stock || book.stock;
        book.pdfUrl = req.body.pdfUrl || book.pdfUrl;
        book.preview = req.body.preview || book.preview;
        book.summary = req.body.summary || book.summary;
    }
    const updatedBook = await book.save();
    res.json(updatedBook);
}

export const uploadImage = async (req, res) => {
    const result = await cloudinary.uploader.upload(req.file.path);
    res.json(result);
}
