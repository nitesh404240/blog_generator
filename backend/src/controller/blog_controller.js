import Blog from "../model/blog_model.js";
import { getGroqResponse } from "../config/Aiconfig.js";

export const createBlog = async (req, res) => {

  try {

    const { category } = req.body;

    if (!category) {

      return res.status(400).json({
        success: false,
        message: "Category is required",
      });

    }

    const prompt =
      `Write a professional blog on ${category}`;

    const generatedBlog =
      await getGroqResponse(prompt);

    if (!generatedBlog) {

      return res.status(500).json({
        success: false,
        message: "AI failed to generate blog",
      });

    }

    const blog = await Blog.create({

      category,

      title:
        category.charAt(0).toUpperCase() +
        category.slice(1) +
        " Blog",

       content: generatedBlog.content,

    });

    res.status(201).json({
      success: true,
      blog,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};
export const getBlogs = async (req, res) => {

  try {

    const blogs = await Blog.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      blogs,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};