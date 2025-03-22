import { validationResult } from "express-validator";
import * as tutorProfileService from "../services/tutorProfile.service.js";
import uploadImage from "../utils/uploadImage.js";

export const getTutorAbouInfoById = async (req, res) => {
  try {
    console.log(req.params.id)
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
    
    if (result.length === 0) {
      return res.json([]);
    }
    
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
          gender: item.gender,
          posts: []
        };
        acc.push(tutor);
      }

      // Only add the post if it doesn't already exist in the posts array
      if (!tutor.posts.find(post => post.id === item.id)) {
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
      }

      return acc;
    }, []);

    res.json(transformedResult);
  } catch (error) {
    res.status(500).json({ 
      message: "An error occurred while searching for tutors",
      error: error.message
    });
  }
};

export const saveTutorInfo = async (req, res) => {
  try {
    await uploadImage.uploadImageMiddleware(req, res);
    
    console.log("Processing profile update request:", {
      userId: req.body.userId,
      about: req.body.about,
      age: req.body.age,
      file: req.file ? req.file.originalname : 'No file uploaded'
    });
    
    const profileData = {
      userId: req.body.userId,
      about: req.body.about,
      age: req.body.age,
      picturePath: req.file ? `public/images/${req.file.originalname}` : null
    };

    const result = await tutorProfileService.updateTutorProfile(profileData);
    console.log("Profile update result:", result);
    
    if (result && result.success === false) {
      return res.status(400).json({ 
        message: result.message || "Failed to update profile"
      });
    }
    
    res.status(200).json({ 
      message: "Tutor profile updated",
      picturePath: profileData.picturePath
    });
  } catch (error) {
    console.error("Error updating tutor profile:", error);
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
