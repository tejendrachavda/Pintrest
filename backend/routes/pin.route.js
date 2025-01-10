import express from 'express';
import { commentOnPin, createPin, deleteComment, deletePin, getAllPins, getSinglePin, updatePin } from '../controllers/pin.controller.js';
import { upload } from '../middlewares/multer.middlewares.js';
import { isAuth } from '../middlewares/isAuth.middleware.js';

const router = express.Router();

// router.post("/create" , isAuth , upload , createPin)
router.post("/create", isAuth, upload, createPin);
router.get("/all" , isAuth , getAllPins);
router.get("/:id" , isAuth , getSinglePin);
router.delete("/:id" , isAuth , deletePin);
router.put("/:id", isAuth, updatePin); //update Pin
router.post("/comment/:id", isAuth, commentOnPin);
router.delete("/comment/:id", isAuth, deleteComment);


export default router;