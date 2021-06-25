import AWS from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { uuid } from 'uuidv4';
import log from '../log';

const s3 = new AWS.S3();

const fileFilter = (req: any, file: any, cb: any) => {
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const multerS3Config = multerS3({
  s3,
  bucket: 'revix4trainingbucket',
  metadata: (req, file, cb) => {
    cb(null, { fieldName: file.fieldname });
  },
  key: (req, file, cb) => {
    log.debug(file);
    cb(null, uuid() + file.originalname);
  },
});

const upload = multer({
  storage: multerS3Config,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, // we are allowing only 5 MB files
  },
});

export default upload;
