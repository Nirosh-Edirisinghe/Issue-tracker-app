import IssueModel from "../models/IssueModel.js";


// create issue
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

// Get issues
const getAllIssues = async (req, res) => {
  try {
    const issues = await IssueModel.find()
      .populate("userId", "name email") // fetch user info
      .sort({ createdAt: -1 });

    const formattedIssues = issues.map(issue => ({
      id: issue._id,
      title: issue.title,
      description: issue.description,
      status: issue.status,
      priority: issue.priority,
      createdAt: issue.createdAt,
      updatedAt: issue.updatedAt,
      userData: {
        id: issue.userId?._id,
        name: issue.userId?.name,
        email: issue.userId?.email,
      },
    }));

    res.status(200).json({
      success: true,
      issues: formattedIssues,
    });

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Failed to fetch issues",
    });
  }
};

export { createIssue, getAllIssues }