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

// Update Issue
const updateIssue = async (req, res) => {
  try {
    const issueId = req.params.id;
    const userId = req.user.id;
    const { title, description, status, priority } = req.body;

    const issue = await IssueModel.findById(issueId);

    if (!issue) {
      return res.json({
        success: false,
        message: "Issue not found",
      });
    }

    // Update fields
    issue.title = title;
    issue.description = description;
    issue.status = status;
    issue.priority = priority;

    await issue.save();

    res.status(200).json({
      success: true,
      message: "Issue updated successfully",
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

// Get issue by id
const getSingleIssue = async (req, res) => {
  try {
    const { id } = req.params;

    const issue = await IssueModel.findById(id)
      .populate("userId", "name email");

    if (!issue) {
      return res.json({
        success: false,
        message: "Issue not found",
      });
    }

    const formattedIssue = {
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
    };

    res.status(200).json({
      success: true,
      issue: formattedIssue,
    });

  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: "Server error",
    });
  }
};

// update status
const updateIssueStatus = async (req, res) => {
  try {
    const issueId = req.params.id;
    const { status } = req.body;

    const issue = await IssueModel.findById(issueId);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: "Issue not found",
      });
    }
    issue.status = status;
    await issue.save();

    res.status(200).json({
      success: true,
      issue,
    });

  } catch (error) {
    console.error("Update status error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};



export { createIssue, getAllIssues, updateIssue, getSingleIssue, updateIssueStatus }