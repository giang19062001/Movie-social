import { UnsupportedMediaTypeException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { MessageError } from 'src/helper/messageError.enum';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';

export const multerUser = {
  storage: diskStorage({
    destination: async function (req, file, callBack) {
      if (file) {
        if (fs.existsSync('./images/users/' + req.params?.id) === true) {
          fs.rmSync('./images/users/' + req.params?.id, {
            recursive: true,
            force: true,
          });
        }
        const path = './images/users/' + req.params?.id;
        fs.mkdirSync(path);
        callBack(null, path);
      }
    },
    filename: (req, file, callBack) => {
      if (file) {
        callBack(null, uuidv4() + '-' + Date.now() + file.originalname);
      }
    },
  }),
  fileFilter: (req, file, callBack) => {
    if (file) {
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
    }
  },
};
