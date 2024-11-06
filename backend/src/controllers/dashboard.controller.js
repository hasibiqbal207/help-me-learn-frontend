import * as dashboardService from "../services/dashboard.service.js";

export const dashboard = async (req, res) => {
  try {
    const userResult = await dashboardService.getUserStatistics();
    const postResult = await dashboardService.getPostStatistics();

    res.json({
      usersByStatus: [
        { name: "approved", value: userResult[0].approved },
        { name: "pending", value: userResult[0].pending },
        { name: "rejected", value: userResult[0].rejected },
      ],
      usersByType: [
        { name: "student", value: userResult[0].studentCount },
        { name: "tutor", value: userResult[0].tutorCount },
      ],
      postByStatus: [
        { name: "approved", value: postResult[0].approved },
        { name: "pending", value: postResult[0].pending },
        { name: "rejected", value: postResult[0].rejected },
      ]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
