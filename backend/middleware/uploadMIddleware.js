import multer from 'multer';
import cloudinary from '../config/cloudinary.js';
import CloudinaryStorage from 'multer-storage-cloudinary';

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'ebooks',
    allowed_formats: ['jpg', 'png', 'jpeg', 'pdf'],
  },
});

const upload = multer({ storage });

export default upload;
