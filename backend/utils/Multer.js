
export const getFilesArray = (req) => {
  if (req.files) return req.files;
  if (req.file) return [req.file];
  return [];
};

export const validateFiles = (files) => {
  if (!files || files.length === 0) {
    const error = new Error("At least one image is required");
    error.statusCode = 400;
    throw error;
  }
};
