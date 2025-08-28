import * as fileService from "../services/file.service.js";

export const file = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log("Fetching files for userId:", userId);
    
    if (!userId) {
      return res.status(400).json({ 
        message: "User ID is required" 
      });
    }
    
    const result = await fileService.getTutorFiles(userId);
    console.log("Files found for userId:", userId, "Count:", result.length);
    
    res.status(200).json({ 
      message: "Success", 
      data: result 
    });
  } catch (error) {
    console.error("Error fetching files:", error);
    res.status(500).json({ 
      message: "Something went wrong" 
    });
  }
};

export const image = async (req, res) => {
  try {
    const result = await fileService.getUserImages(req.userid);
    res.status(200).json({ 
      message: "Success", 
      data: result 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: "Something went wrong" 
    });
  }
};
