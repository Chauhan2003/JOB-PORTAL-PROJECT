import Company from "../models/company.model.js";

export const registerCompany = async (req, res) => {
  const { companyName } = req.body;
  if (!companyName) {
    return res.status(400).json({
      success: false,
      message: "Company name is required",
    });
  }

  try {
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        success: false,
        message: "Company already exists",
      });
    }

    company = await Company.create({
      name: companyName,
      userId: req.user.userId,
    });

    return res.status(201).json({
      success: true,
      message: "Company registered successfully",
      company,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error!",
    });
  }
};

export const getCompany = async (req, res) => {
  const { userId } = req.user;
  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  try {
    const company = await Company.find({ userId });
    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Company retrieved successfully",
      company,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error!",
    });
  }
};

export const getCompanyById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Company ID is required",
    });
  }

  try {
    const company = await Company.findById(id);
    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Company retrieved successfully",
      company,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error!",
    });
  }
};

export const updateCompany = async (req, res) => {
  const { companyName, description, website, location } = req.body;
  const file = req.file;

  //   cloudinary

  const updateData = {};

  if (req.body.companyName) updateData.name = req.body.companyName;
  if (req.body.description) updateData.description = req.body.description;
  if (req.body.website) updateData.website = req.body.website;
  if (req.body.location) updateData.location = req.body.location;

  try {
    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Company updated successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error!",
    });
  }
};
