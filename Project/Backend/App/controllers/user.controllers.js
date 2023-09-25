const userModel = require("../../DataBase/models/user.model");
const { resGen, imagePath, updateUser } = require("../helper");
const bcrypt = require("bcrypt");

class User {
  // fetures available for any user //

  static async showHome(req, res) {
    try {
      resGen(res, 200, true, "Home showed Successfully", req.user);
    } catch (e) {
      resGen(res, 500, false, "Error occured in showing home", null);
    }
  }
  static async signUp(req, res) {
    try {
      const userData = new userModel(req.body);
      await userData.save();
      resGen(res, 200, true, "user added successfully", userData);
    } catch (e) {
      resGen(res, 500, false, "error occured in registeration", e);
    }
  }
  static async logIn(req, res) {
    try {
      const { email, password } = req.body;
      const userData = await userModel.logMe(email, password);
      const token = await userData.generateToken();
      resGen(res, 200, true, "logged in successfully", { userData, token });
    } catch (e) {
      resGen(res, 500, false, e.message, null);
    }
  }
  static async logOut(req, res) {
    try {
      req.user.tokens = req.user.tokens.filter((t) => t.token !== req.token);
      await userModel.findByIdAndUpdate(
        req.user._id,
        {
          tokens: req.user.tokens,
        },
        { runValidators: true }
      );
      resGen(res, 200, true, "logged out successfully", req.user);
    } catch (e) {
      resGen(res, 500, false, e.message, req.user);
    }
  }
  static async showProfile(req, res) {
    try {
      resGen(res, 200, true, "profile showed successfully", req.user);
    } catch (e) {
      resGen(res, 500, false, e.message, null);
    }
  }
  static async editProfile(req, res) {
    try {
      req.user = updateUser(req);
      await req.user.save();
      resGen(res, 200, true, "profile edited successfully", req.user);
    } catch (e) {
      resGen(res, 500, false, e, null);
    }
  }
  static async changePassword(req, res) {
    try {
      const { oldPsw, newPsw, confirmed } = req.body;
      const isCorrectPsw = await bcrypt.compare(oldPsw, req.user.password);
      if (!isCorrectPsw) {
        resGen(res, 500, false, "password is incorrect", null);
        return;
      }
      if (newPsw === confirmed) {
        if (newPsw === oldPsw) {
          resGen(res, 500, false, "this is the same as the old password", null);
          return;
        }
        req.user.password = newPsw;
        req.user.confirmedPassword = newPsw;
        req.user.tokens = req.user.tokens.filter((t) => t.token !== req.token);
        await req.user.save();
        resGen(res, 200, true, "password changed successfully", req.user);
        return;
      }
      resGen(res, 500, false, "passwords doesn't matche", null);
    } catch (e) {
      resGen(res, 500, false, e, null);
    }
  }
  static async deleteAcc(req, res) {
    try {
      await userModel.findByIdAndDelete(req.user._id);
      resGen(
        res,
        200,
        true,
        "account deleted successfully",
        "no longer exxists !!"
      );
    } catch (e) {
      resGen(res, 500, false, "error occurred in deleting", req.user);
    }
  }
  static async uploadImage(req, res) {
    try {
      const pathName = imagePath(req);
      req.user.image = process.env.APP_URL + pathName.replace("public", "");
      await req.user.save();
      resGen(res, 200, true, "Image uploaded successfully", req.user);
    } catch (e) {
      resGen(res, 500, false, "error in uploading Image", req.user);
    }
  }

  // features for only admins //

  static async showAdminHome(req, res) {
    try {
      resGen(res, 200, true, "Admin Home showed Successfully", req.user);
    } catch (e) {
      resGen(res, 500, false, "Error occured in showing home", null);
    }
  }
  static async changeStatus(req, res) {
    try {
      const userData = await userModel.findById(req.params.id);
      if (!userData) throw new Error("user not found !!");
      userData.status = !userData.status;
      await userModel.findByIdAndUpdate(req.params.id, userData);
      resGen(res, 200, true, "status changed successfully", userData);
    } catch (e) {
      resGen(res, 500, false, e.message, null);
    }
  }
  static async deleteUserAccFromAdmin(req, res) {
    try {
      const userData = await userModel.findByIdAndDelete(req.params.id);
      if (!userData) throw new Error("user not found !!");
      resGen(res, 200, true, "user deleted", userData);
    } catch (e) {
      resGen(res, 500, false, e.message, null);
    }
  }
  static async addAdmin(req, res) {
    try {
      const adminData = new userModel(req.body);
      await adminData.save();
      resGen(res, 200, true, "Admin added successfully", adminData);
    } catch (e) {
      resGen(res, 500, false, "error occured in registeration", e.message);
    }
  }
  static async showSingleUser(req, res) {
    try {
      const userData = await userModel.findById(req.params.id);
      if (!userData) throw new Error("user not found !!");
      resGen(res, 200, true, "user showed successfully", userData);
    } catch (e) {
      resGen(res, 500, false, e.message, null);
    }
  }
  static async showAllUsers(req, res) {
    try {
      const allUsers = await userModel.find({ userType: "user" });
      resGen(res, 200, true, "All users showed successfully", allUsers);
    } catch (e) {
      resGen(res, 500, false, e.message, null);
    }
  }
  static async showActiveUsers(req, res) {
    try {
      const allUsers = await userModel.find({ userType: "user", status: true });
      resGen(res, 200, true, "All active users showed successfully", allUsers);
    } catch (e) {
      resGen(res, 500, false, e.message, null);
    }
  }
  static async showInactiveUsers(req, res) {
    try {
      const allUsers = await userModel.find({
        userType: "user",
        status: false,
      });
      resGen(
        res,
        200,
        true,
        "All Inactive users showed successfully",
        allUsers
      );
    } catch (e) {
      resGen(res, 500, false, e.message, null);
    }
  }
}

module.exports = User;
