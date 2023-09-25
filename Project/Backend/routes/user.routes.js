const User = require("../App/controllers/user.controllers");
const { userAuth, adminAuth } = require("../App/middleware/user.middle");
const upload = require("../App/middleware/user.upload");
const router = require("express").Router();

// actions with no authentications
router.post("/signup", User.signUp);
router.post("/login", User.logIn);

// actions for user authentications
router.post("/", userAuth, User.showHome);
router.post("/logout", userAuth, User.logOut);
router.post("/showprofile", userAuth, User.showProfile);
router.post("/editprofile", userAuth, User.editProfile);
router.delete("/deleteAcc", userAuth, User.deleteAcc);
router.post("/uploadImage", userAuth, upload.single("Image"), User.uploadImage);
router.post("/changepassword", userAuth, User.changePassword);

// admin authentications
router.post("/", userAuth, adminAuth, User.showAdminHome);
router.post("/changestatus/:id", userAuth, adminAuth, User.changeStatus);
router.delete(
  "/deleteUser/:id",
  userAuth,
  adminAuth,
  User.deleteUserAccFromAdmin
);
router.post("/show/:id", userAuth, adminAuth, User.showSingleUser);
router.post("/showall", userAuth, adminAuth, User.showAllUsers);
router.post("/showactive", userAuth, adminAuth, User.showActiveUsers);
router.post("/showinactive", userAuth, adminAuth, User.showInactiveUsers);
router.post("/addAdmin", userAuth, adminAuth, User.addAdmin);

module.exports = router;
