import IssueModel from "../models/IssueModel.js";

const createIssue = async (req, res) => {
  try {
    const userId = req.user.id; // from authUser middleware
    const { title, description, status, priority } = req.body;

    if (!title || !description) {
      return res.json({
        success: false,
        message: "Title and description are required",
      });
    }
    const issue = await IssueModel.create({
      title,
      description,
      status,
      priority,
      userId,
    });

    res.status(201).json({
      success: true,
      message: "Issue created successfully",
      issue,
    });

  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: "Server error",
    });
  }
};

export { createIssue }