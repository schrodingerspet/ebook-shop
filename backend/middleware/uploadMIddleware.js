import multer from 'multer';

import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary';

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'ebooks',
        allowed_format: ['jpg', 'png', 'jpeg', 'pdf']
    }
});

const upload = multer({ storage });
export default upload;