// let database = require("../database");
// const { validationResult } = require("express-validator");
// const util = require("util");

// const executeQuery = util.promisify(database.query).bind(database);

// module.exports = {

//   submitVote: async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     let {
//       Id,
//       CourseName,
//       Description,
//       Level,
//     } = req.body;

//     TutorProfileId = Id; UpVote = 0; DownVote = 0;

//     database.query(
//       "INSERT INTO hm_poll (coursename, description, level, tutorProfileId, upVote, downVote) VALUES ( ?, ?, ?, ?, ?, ?)",
//       [CourseName, Description, Level, TutorProfileId, UpVote, DownVote],
//       (err, result) => {
//         if (err) res.status(400).send(`Response Error: ${err}`);
//         else
//           res
//             .status(200)
//             .json({ message: `Poll created successfully.` });
//       });
//   },

//   viewCreatedPolls: async (req, res) => {
//     let StudentProfileId = req.params.id;
//     database.query(
//       "SELECT A.id, coursename, description, level, upVotePer, downVotePer, tutorProfileId, CONCAT_WS(" ", B.firstName, B.lastName) AS TutorName FROM helpmelearn.hm_poll A, helpmelearn.hm_user B WHERE A.tutorProfileId = B.id AND A.id NOT IN (SELECT id  FROM helpmelearn.hm_poll WHERE studentId LIKE '%$StudentProfileId%') ORDER BY id DESC;",
//       [StudentProfileId],
//       (err, result) => {
//         if (err) res.status(400).send(`Response Error: ${err}`);
//         else res.status(200).json(result);
//       }
//     );
//   },

//   updatePost: async (req, res) => {
//     try {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }

//       const {
//         id,
//         courseName,
//         description,
//         level,
//       } = req.body;

//       const date = new Date().toISOString().split("T")[0];

//       database.query(
//         "UPDATE hm_post SET description=?, tutorProfileId=?, status=?, `language`=?, subjectName=?, ratePerHour=?, modifiedDateTime=?, experienceYears=?, availableTime=? WHERE id = ?;",
//         [
//           description,
//           id,
//           Status,
//           Language,
//           SubjectName,
//           RatePerHour,
//           date,
//           ExperinceYears,
//           AvailableTime,
//           id,
//         ],
//         (err, result) => {
//           if (err) res.status(400).send(`Response Error: ${err}`);
//           else res.status(204).json({ message: "Post Details Updated" });
//         }
//       );
//     } catch (error) {
//       res.status(400).send(`Response Error: ${error}`);
//     }
//   },
// };
