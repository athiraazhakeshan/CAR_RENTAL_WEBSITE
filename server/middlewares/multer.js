// import multer, { diskStorage } from "multer";

// const storage = diskStorage({
//     filename: function (req, file, cb) {
//         console.log('file===',file);
        
//         cb(null, file.originalname);
//     },
// });


// export const upload = multer({ storage: storage });


import multer, { diskStorage } from "multer";

const storage = diskStorage({
    filename: function (req, file, cb) {
        console.log('file===', file);
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});

export const upload = multer({ storage: storage });
