import { UnsupportedMediaTypeException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { MessageError } from 'src/helper/messageError.enum';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';

export const multerMovie = {
  storage: diskStorage({
    destination: function (req, file, callBack) {
      const title = JSON.parse(JSON.stringify(req.body?.title));
      const path = './images/movies/' + title;
      fs.mkdirSync(path);
      callBack(null, path);
    },
    filename: (req, file, callBack) => {
      callBack(null, uuidv4() + '-' + Date.now() + file.originalname);
    },
  }),
  fileFilter: (req, file, callBack) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      callBack(null, true);
    } else {
      callBack(null, false);
      return callBack(
        new UnsupportedMediaTypeException(MessageError.WrongMediaType),
      );
    }
  },
};
