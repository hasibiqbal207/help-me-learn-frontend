import * as dashboardService from "../services/dashboard.service.js";

export const dashboard = async (req, res) => {
  try {
    const userResult = await dashboardService.getUserStatistics();
    const postResult = await dashboardService.getPostStatistics();

    res.json({
      usersByStatus: [
        { name: "Approved", value: userResult[0].approved },
        { name: "Pending", value: userResult[0].pending },
        { name: "Rejected", value: userResult[0].rejected },
      ],
      usersByType: [
        { name: "Student", value: userResult[0].studentCount },
        { name: "Tutor", value: userResult[0].tutorCount },
      ],
      postByStatus: [
        { name: "Approved", value: postResult[0].approved },
        { name: "Pending", value: postResult[0].pending },
        { name: "Rejected", value: postResult[0].rejected },
      ]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
