import cloudinary from "./cloudinary.js";
import multer from "multer";

const memoryStorage = multer.memoryStorage();

const upload = multer({
  storage: memoryStorage,
  fileFilter: function (req, file, cb) {
    if (!file) {
      // Allow no file for community uploads
      if (req.originalUrl.includes("/api/community/")) {
        return cb(null, false);
      }
      return cb(new Error("No file provided."), false);
    }

    // Validate file type
    const allowedTypes = /jpeg|jpg|png|gif/;
    const isValid = allowedTypes.test(file.mimetype);
    if (!isValid) {
      return cb(
        new Error("Invalid file type. Only images are allowed."),
        false
      );
    }

    cb(null, true);
  },
});

const uploadToCloudinary = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  try {
    let folderName;
    let publicId;

    // Determine folder based on the route
    if (req.originalUrl.includes("/api/users/")) {
      folderName = "profile_images";
      publicId = `user_${req.user?._id || Date.now()}`;
    } else if (req.originalUrl.includes("/api/community/")) {
      folderName = "community_images";
      publicId = `community_${Date.now()}`;
    } else {
      folderName = "default_images";
      publicId = `file_${Date.now()}`;
    }

    const result = await cloudinary.uploader.upload(req.file.buffer, {
      folder: folderName,
      public_id: publicId,
      resource_type: "image",
    });

    // Store the Cloudinary URL in req.body
    req.body.photo = result.secure_url;

    next();
  } catch (error) {
    return next(error);
  }
};

export { upload, uploadToCloudinary };
