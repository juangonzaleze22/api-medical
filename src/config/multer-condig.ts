import multer, { FileFilterCallback, MulterError } from 'multer';
import { Request } from 'express';

interface CustomFile extends Express.Multer.File {
  originalname: string;
  mimetype: 'image/jpeg' | 'image/png' | 'image/webp';
}

const storage: multer.StorageEngine = multer.diskStorage({
  destination: (_req: Request, _file: any, callback: (error: Error | null, destination: string) => void) => {
    // Replace 'uploads/' with your desired destination path
    // Ensure the directory exists and has appropriate permissions
    callback(null, 'uploads/');
  },
  filename: (_req: Request, file: CustomFile, callback: (error: Error | null, filename: string) => void) => {
    callback(null, Date.now() + '-' + file.originalname);
  },
});

const fileFilter = (
    _req: Request,
    file: Express.Multer.File,
    callback: FileFilterCallback
) => {
    if (['image/jpeg', 'image/png', 'image/webp'].includes(file.mimetype)) {
        return callback(null, true);
    } else {
      return callback(new MulterError('LIMIT_UNEXPECTED_FILE', 'Solo se permiten archivos JPG, JPEG, PNG y WEBP'));
    }
};

const upload: multer.Multer = multer( {
    storage, 
    fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5, // 5 MB
    }

} );

export default upload;