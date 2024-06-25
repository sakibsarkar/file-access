import { Router } from "express";
import { accessFileController } from "../controllers/file.controller";
import { getAccess } from "../controllers/user.controller";
import { isAuthenticatedUser } from "../middlewares/auth";
import { checkFileAccess } from "../middlewares/checkFileAccess";

const router = Router();
router.get(
  "/access/:fileName",
  isAuthenticatedUser,
  checkFileAccess,
  accessFileController
);
router.post("/get/access", isAuthenticatedUser, getAccess);
const fileRoute = router;
export default fileRoute;
