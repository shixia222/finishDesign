const CourseService = require("../services/CourseService");

const CourseController = {
  addCourse: async (req, res) => {
    const { course, img } = req.body;
    const { course_name, content, video_path, type, resolution_type } = course;
    const result = await CourseService.addCourse(
      course_name,
      content,
      img,
      video_path,
      type,
      resolution_type
    );
    console.log(course);
    if (result.success) {
      res.send({
        data: result.data,
        success: true,
      });
    } else {
      res.send({ success: false, reason: result.message });
    }
  },

  deleteCourse: async (req, res) => {
    const { id } = req.body;
    const result = await CourseService.deleteCourse(id);
    if (result == "success") {
      res.send({
        success: true,
      });
    } else {
      res.send({ success: false });
    }
  },

  //   updateUser: async (req, res) => {
  //     const { id, username, password } = req.body;
  //     const result = await UserService.updateUser(id, username, password);
  //     if (result == "success") {
  //       res.send({
  //         success: true,
  //       });
  //     } else {
  //       res.send({ success: false });
  //     }
  //   },

  //   signIn: async (req, res) => {
  //     const { account, password } = req.body;
  //     const result = await UserService.signIn(account, password);
  //     if (result.success) {
  //       res.send({
  //         success: true,
  //         data: result.data,
  //       });
  //     } else {
  //       res.send({ success: false });
  //     }
  //   },

  getList: async (req, res) => {
    const { curPage, number } = req.body;
    const result = await CourseService.getList(curPage, number);
    if (result.data.length != 0) {
      res.send({
        success: true,
        total: result.total,
        data: result.data,
      });
    } else {
      res.send({
        success: false,
      });
    }
  },
  getListByType: async (req, res) => {
    const { curPage, number, type } = req.body;
    const result = await CourseService.getListByType(curPage, number, type);
    if (result.data.length != 0) {
      res.send({
        success: true,
        total: result.total,
        data: result.data,
      });
    } else {
      res.send({
        success: false,
      });
    }
  },
  getListByResType: async (req, res) => {
    const { curPage, number, resolution_type } = req.body;
    const result = await CourseService.getListByResType(
      curPage,
      number,
      resolution_type
    );
    console.log(resolution_type)
    if (result.data.length != 0) {
      res.send({
        success: true,
        total: result.total,
        data: result.data,
      });
    } else {
      res.send({
        success: false,
      });
    }
  },
  getDetails: async (req, res) => {
    const { id } = req.body;
    const result = await CourseService.getDetails(id);
    res.send(result);
  },
};

module.exports = CourseController;
