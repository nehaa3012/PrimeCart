import cloudinary from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.v2.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

export const uploadtoCloudinary = (buffer,folder) => {
    return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload_stream({folder}, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        }).end(buffer);
    });
};

export const deletefromCloudinary = (public_id) => {
    return cloudinary.v2.uploader.destroy(public_id);
};

