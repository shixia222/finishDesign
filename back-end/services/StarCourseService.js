const StarCourseModel = require("../model/StarCourseModel");

const StarCourseService = {
  addStarCourse: (user_id, star_course) => {
    return StarCourseModel.create({
      user_id,
      star_course,
    })
      .then((res) => {
        return {
          success: true,
          // data: data,
        };
      })
      .catch((err) => {
        return err;
      });
  },
  deleteStarCourse: (user_id, course_id) => {
    return StarCourseModel.updateOne(
      { user_id },
      { $pull: { star_course: course_id } }
    ).then((res) => {
      if (res.acknowledged) {
        return "success";
      } else {
        return "failed";
      }
    });
  },
  updateStarCourse: (user_id, star_course) => {
    return StarCourseModel.updateOne(
      { user_id },
      {
        star_course,
      }
    ).then((res) => {
      if (res.acknowledged) {
        return "success";
      } else {
        return "failed";
      }
    });
  },
  getList: (curPage, number, user_id) => {
    return StarCourseModel.find({ user_id }).then((res) => {
      return {
        total: res.length,
        data: res.splice((curPage - 1) * number, number),
      };
    });
  },
  getDetails: (user_id, star_course_id) => {
    return StarCourseModel.findOne({
      user_id,
      star_course: { $elemMatch: { $eq: star_course_id } },
    });
  },
};

module.exports = StarCourseService;
