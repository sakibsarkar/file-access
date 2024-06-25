import catchAsyncError from "./catchAsyncErrors";

export const checkFileAccess = catchAsyncError(async (req, res, next) => {
  const user = req.user;
  if (!user) return res.json({});
  const fileId = req.params.fileName;
  if (user.access.includes(fileId)) {
    next();
  } else {
    res.json({ success: false, message: "Forbidden access", data: null });
  }
});
