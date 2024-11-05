import { validationResult } from "express-validator";
import * as tutorProfileService from "../services/tutorProfile.service.js";
import uploadFile from "../utils/upload.js";

export const getTutorAbouInfoById = async (req, res) => {
  try {
    const result = await tutorProfileService.getTutorAboutInfo(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTutorOfferedCoursesById = async (req, res) => {
  try {
    const result = await tutorProfileService.getTutorOfferedCourses(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTutorQualificationById = async (req, res) => {
  try {
    const result = await tutorProfileService.getTutorQualifications(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getReviewsById = async (req, res) => {
  try {
    const result = await tutorProfileService.getTutorReviews(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTutorsByStatus = async (req, res) => {
  try {
    const result = await tutorProfileService.getTutorsByStatusFilter(req.query.status);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchTutorProfile = async (req, res) => {
  try {
    const result = await tutorProfileService.searchTutorProfiles(req.query);
    
    const transformedResult = result.reduce((acc, item) => {
      let tutor = acc.find(x => x.tutorId === item.tutorProfileId);
      
      if (!tutor) {
        tutor = {
          userId: item.userId,
          tutorId: item.tutorProfileId,
          firstName: item.firstName,
          lastName: item.lastName,
          picPath: item.picPath,
          about: item.about,
          posts: []
        };
        acc.push(tutor);
      }

      tutor.posts.push({
        id: item.id,
        description: item.description,
        status: item.status,
        language: item.language,
        ratePerHour: item.ratePerHour,
        subjectName: item.subjectName,
        availableTime: item.availableTime,
        experienceYears: item.experienceYears
      });

      return acc;
    }, []);

    res.json(transformedResult);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const saveTutorInfo = async (req, res) => {
  try {
    await uploadFile(req, res);
    
    const profileData = {
      userId: req.body.userId,
      about: req.body.about,
      age: req.body.age,
      picturePath: req.file ? `public/images/${req.file.originalname}` : null
    };

    await tutorProfileService.updateTutorProfile(profileData);
    res.status(200).json({ message: "Tutor profile updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTutorInfo = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    await tutorProfileService.updateTutorStatus(req.body.userId, req.body.status);
    res.json({ message: "Tutor Profile Updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
