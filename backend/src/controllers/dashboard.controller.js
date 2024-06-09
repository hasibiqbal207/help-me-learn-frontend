let database = require("../database");
const util = require("util");

const executeQuery = util.promisify(database.query).bind(database);

export const dashboard = async (req, res) => {
  
    // Query
    let userResullt = await executeQuery(
      "SELECT COUNT(IF(a.status = 100,1, NULL)) as 'Pending', COUNT(IF(a.status = 101, 1, NULL)) as 'Approved', COUNT(IF(a.status = 102, 1, NULL)) as 'Rejected', COUNT(IF(a.usertype = 101, 1, NULL)) as 'Tutor', COUNT(IF(a.usertype = 102, 1, NULL)) as 'Student' FROM helpmelearn.hm_user a;",
      []
    );
  
    let postResult = await executeQuery(
      "SELECT COUNT(IF(a.status = 100,1, NULL)) as 'Pending', COUNT(IF(a.status = 101, 1, NULL)) as 'Approved', COUNT(IF(a.status = 102, 1, NULL)) as 'Rejected' FROM helpmelearn.hm_tutor_profile a;",
      []
    );
  
    res.json({
      UsersByStatus: [
        { name: "Approved", value: userResullt[0].Approved },
        { name: "Pending", value: userResullt[0].Pending },
        { name: "Rejected", value: userResullt[0].Rejected },
      ],
      UsersByType: [
        { name: "Student", value: userResullt[0].Student },
        { name: "Tutor", value: userResullt[0].Tutor },
      ],
      PostByStatus: [
        { name: "Approved", value: postResult[0].Approved },
        { name: "Pending", value: postResult[0].Pending },
        { name: "Rejected", value: postResult[0].Rejected },
      ]
    });
  }