import {Router} from "express"

import { createBlog , getBlogs } from "../controller/blog_controller.js"; 
const router = Router();




router.route("/create").post(createBlog);

router.route("/get-blogs").get(getBlogs);

export default router;
