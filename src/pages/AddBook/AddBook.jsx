import { useState } from 'react';
import { apiRequest } from '../../utils/api';
import './AddBook.css';

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    price: '',
    image: '',
    description: '',
    category: '',
    stock: '',
    pdfUrl: '',
    preview: '',
    summary: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await apiRequest('/api/books', {
        method: 'POST',
        body: formData
      });
      setMessage('Book added successfully!');
      setFormData({
        title: '',
        author: '',
        price: '',
        description: '',
        category: '',
        stock: '',
        pdfUrl: '',
        preview: '',
        summary: ''
      });
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-book">
      <h1>Add New Book</h1>
      <form onSubmit={handleSubmit} className="add-book-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image URL</label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="stock">Stock</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="pdfUrl">PDF URL</label>
          <input
            type="url"
            id="pdfUrl"
            name="pdfUrl"
            value={formData.pdfUrl}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="preview">Preview</label>
          <input
            type="text"
            id="preview"
            name="preview"
            value={formData.preview}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="summary">Summary</label>
          <textarea
            id="summary"
            name="summary"
            value={formData.summary}
            onChange={handleChange}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Book'}
        </button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default AddBook;