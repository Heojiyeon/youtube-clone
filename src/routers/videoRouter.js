import express from 'express';
import { edit, see, upload, deleteVideo } from '../controllers/videoController';

const videoRouter = express.Router();

videoRouter.get("/upload", upload);
videoRouter.get("/:id", see);
videoRouter.get("/:id/edit", edit);
videoRouter.get("/:id/deleteVideo", deleteVideo);

export default videoRouter;