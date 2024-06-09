const uploadFile = require("../middleware/upload");
const database = require("../database");
const util = require("util");
require("dotenv").config();

const executeQuery = util.promisify(database.query).bind(database);

export const upload = async (req, res) => {
  try {

    await uploadFile(req, res);

    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    var result = await executeQuery('SELECT id FROM hm_tutor_profile WHERE userId = ?', [req.userid]);
    var tutorProfileId = result[0].id;

    await executeQuery(
      "UPDATE hm_tutor_profile SET status = 100 WHERE id = ?;",
      [tutorProfileId]
    );

    if(req.file.mimetype === "application/pdf") {
      
        database.execute("SELECT * FROM `helpmelearn`.`hm_file` WHERE `tutorProfileId`= ?",
        [tutorProfileId],
        (err, result) => {
            if(err) {
                console.log(err);
                res.status(500).send({message:"Something went wrong"});
            }
            else if(result.length >= 1) {
              database.execute("DELETE FROM `helpmelearn`.`hm_file` WHERE (`tutorProfileId` = ?)",
              [tutorProfileId],(err, result)=> {
                    if(err) {
                      console.log(err);
                      res.status(500).send({message:"Something went wrong"});
                  }
                  else {
                    database.execute("INSERT INTO `helpmelearn`.`hm_file` ( `tutorProfileId`, `fileName`, `fileType`, `fileExtension`, `filePath`) VALUES (?, ?, ?, ?, ?)", 
                    [tutorProfileId, 
                    req.file.originalname, 
                    0, 
                    "pdf", 
                    "resources/static/"+req.file.originalname], 
                    (err, result) => {

                      if (err){ 
                        console.log(err);
                        res.status(500).send({message: "Somethid went wrong during inserting into DB"});
                      }

                      res.status(200).send({
                        message: "Uploaded the file successfully: " + req.file.originalname,
                      });
                    });
                  }
              });
            }
            else {

              database.execute("INSERT INTO `helpmelearn`.`hm_file` ( `tutorProfileId`, `fileName`, `fileType`, `fileExtension`, `filePath`) VALUES (?, ?, ?, ?, ?)", 
              [tutorProfileId, 
              req.file.originalname, 
              0, 
              "pdf", 
              "resources/static/"+req.file.originalname], 
              (err, result) => {

                if (err){ 
                  console.log(err);
                  res.status(500).send({message: "Somethid went wrong during inserting into DB"});
                }

                res.status(200).send({
                  message: "Uploaded the file successfully: " + req.file.originalname,
                });
              });
            }

        });

    }
    else if(req.file.mimetype === "image/jpg" || req.file.mimetype === "image/jpeg" || req.file.mimetype === "image/png") {
       
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
        console.log(req.userid);
        database.execute("SELECT * FROM `helpmelearn`.`hm_image` WHERE `userId`= ?",
        [req.userid],
        (err, result) => {
            if(err) {
                console.log(err);
                res.status(500).send({message:"Something went wrong"});
            }
            else if(result.length >= 1) {
              database.execute("DELETE FROM `helpmelearn`.`hm_image` WHERE (`userId` = ?)",
              [req.userid],(err, result)=> {
                    if(err) {
                      console.log(err);
                      res.status(500).send({message:"Something went wrong"});
                  }
                  else {
                    database.execute("INSERT INTO `helpmelearn`.`hm_image` ( `imagePath`, `date`, `userId`, `createdDateTime`, `modifiedDateTime`) VALUES (?, ?, ?, ?, ?)", 
                    ["resources/static/"+req.file.originalname, 
                    dateTime, 
                    req.userid, 
                    dateTime, 
                    dateTime], 
                    (err, result) => {
                        if (err){ console.log(err);
                            res.status(500).send({message: "Somethid went wrong during inserting into DB"});
                        }
                        res.status(200).send({
                            message: "Uploaded the image successfully: " + req.file.originalname,
                            });
                    });
                  }
              });
            }
            else {

              database.execute("INSERT INTO `helpmelearn`.`hm_image` ( `imagePath`, `date`, `userId`, `createdDateTime`, `modifiedDateTime`) VALUES (?, ?, ?, ?, ?)", 
              ["resources/static/"+req.file.originalname, 
              dateTime, 
              req.userid, 
              dateTime, 
              dateTime], 
              (err, result) => {
                  if (err){ console.log(err);
                      res.status(500).send({message: "Somethid went wrong during inserting into DB"});
                  }
                  res.status(200).send({
                      message: "Uploaded the image successfully: " + req.file.originalname,
                    });
              });
            }
        });
    }

  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file: ${req.file?.originalname}. ${err}`,
    });
  }
};

