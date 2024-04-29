const StarCourseService = require("../services/StarCourseService");
const CourseService = require("../services/CourseService");

const StarCourseController = {
  addStarCourse: async (req, res) => {
    const { user_id, star_course } = req.body;
    const isExistStarCourse = await StarCourseService.getDetails(user_id);
    if (isExistStarCourse !== null && isExistStarCourse.length == 0) {
      const result = await StarCourseService.addStarCourse(
        user_id,
        star_course
      );
      if (result.success) {
        res.send({
          data: result.data,
          success: true,
        });
      } else {
        res.send({ success: false, reason: result.message });
      }
    } else {
      let new_star_course;
      if (isExistStarCourse !== null) {
        new_star_course = [...isExistStarCourse[0].star_course, star_course];
      } else {
        new_star_course = [star_course];
      }
      const result = await StarCourseService.updateStarCourse(
        user_id,
        new_star_course
      );
      if (result.success) {
        res.send({
          data: result.data,
          success: true,
        });
      } else {
        res.send({ success: false, reason: result.message });
      }
    }
  },
  deleteStarCourse: async (req, res) => {
    const { user_id, course_id } = req.body;
    const result = await StarCourseService.deleteStarCourse(user_id, course_id);
    if (result == "success") {
      res.send({
        success: true,
      });
    } else {
      res.send({ success: false });
    }
  },
  updateStarCourse: async (req, res) => {
    const { user_id, star_course } = req.body;
    const result = await StarCourseService.updateStarCourse(
      user_id,
      star_course
    );
    if (result == "success") {
      res.send({
        success: true,
      });
    } else {
      res.send({ success: false });
    }
  },
  getList: async (req, res) => {
    const { curPage, number, user_id } = req.body;
    const result = await StarCourseService.getList(curPage, number, user_id);
    if (result.data.length != 0) {
      const starCourse = await Promise.all(
        result.data[0].star_course.map(async (item) => {
          return await CourseService.getDetails(item);
        })
      );
      res.send({
        success: true,
        total: result.total,
        data: starCourse,
      });
    } else {
      res.send({
        success: false,
      });
    }
  },
  getDetails: async (req, res) => {
    const { user_id, star_course_id } = req.body;
    const result = await StarCourseService.getDetails(user_id, star_course_id);
    res.send(result);
  },
};

module.exports = StarCourseController;
