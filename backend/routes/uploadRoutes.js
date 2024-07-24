import path from "path"
import express from "express";
import multer from "multer";

const router = express.Router()

const storage = multer.diskStorage({
    // destination of request, file and also giving callback function cb
    destination: (req, file, cb) => {
        // not providing anything for the first parameter and providing uploads folder for the second argument
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        //creating extension name
        const extname = path.extname(file.originalname) //extname() is a method on node.js, also grabbiong the file with file.originalname
        cb(null, `${file.fieldname}-${Date.now()}${extname}`);
    },
});

const fileFilter = (req, file, cb) => {
    //file formats
    const filetypes = /jpe?g|png|webp/;
    const mimetypes = /image\/jpe?g|image\/png||image\/webp/;

    //getting our extension
    const extname = path.extname(file.originalname) //extname() is a method on node.js, also grabbiong the file with file.originalname
    const mimetype = file.mimetype

    //testing the extension name and also the mimetype
    if (filetypes.test(extname) && mimetypes.test(mimetype)) {
        // creating callback function
        cb(null, true)
    } else {
        cb(new Error("Images only"), false)
    }
};

// creating our upload

const upload = multer({ storage, fileFilter })
const uploadSingleImage = upload.single('image')

router.post('/', (req, res) => {
    uploadSingleImage(req, res, (err) => {
        if (err) {
            res.status(400).send({ message: err.message })
        } else if (req.file) {
            res.status(200).send({
                message: "Image uploaded successfully",
                image: `/${req.file.path}`,
            })
        }else{
            res.status(400).send({message:"No image file provided"})
        }
    });
});

export default router;
