import * as adminService from "../services/admin.service.js";

export const deleteUser = async (req, res) => {
  const userName = req.query.username;
  
  try {
    await adminService.removeUserFromDatabase(userName);
    res.json({ success: true, message: "User deleted successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};