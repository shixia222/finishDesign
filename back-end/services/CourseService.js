const CourseModel = require("../model/CourseModel");
// const RecordModel = require("../model/RecordModel");
// const AskModel = require("../model/AskModel");
// const AnswerModel = require("../model/AnswerModel");

const CourseService = {
  addCourse: (course_name, content, img, video_path, type, resolution_type) => {
    return CourseModel.create({
      course_name,
      content,
      img,
      video_path,
      type,
      resolution_type,
    });
  },
  deleteCourse: (id) => {
    return CourseModel.deleteOne({ _id: id }).then((res) => {
      if (res.deletedCount == 1) {
        return "success";
      } else {
        return "failed";
      }
    });
  },
  //   updateUser: (id, username, password) => {
  //     return UserModel.updateOne(
  //       { _id: id },
  //       {
  //         username: username,
  //         password: password,
  //       }
  //     ).then((res) => {
  //       if (res.acknowledged) {
  //         return "success";
  //       } else {
  //         return "failed";
  //       }
  //     });
  //   },
  //   signIn: (account, password) => {
  //     return UserModel.find({ account: account, password: password }, ["_id", "username", "gender", "height"]).then(
  //       (res) => {
  //         if (res.length === 1) {
  //           const { _id, username, gender, height } = res[0];
  //           const data = {
  //             id: _id,
  //             username: username,
  //             gender: gender,
  //             height: height,
  //           };
  //           return {
  //             success: true,
  //             data: data,
  //           };
  //         } else {
  //           return "failed";
  //         }
  //       }
  //     );
  //   },
  getList: (curPage, number) => {
    return CourseModel.find().then((res) => {
      return {
        total: res.length,
        data: res.splice((curPage - 1) * number, number),
      };
    });
  },
  getListByType: (curPage, number, type) => {
    return CourseModel.find({ type: type }).then((res) => {
      return {
        total: res.length,
        data: res.splice((curPage - 1) * number, number),
      };
    });
  },
  getListByResType: (curPage, number, resolution_type) => {
    return CourseModel.find({ resolution_type: resolution_type }).then((res) => {
      return {
        total: res.length,
        data: res.splice((curPage - 1) * number, number),
      };
    });
  },
  getDetails: (id) => {
    return CourseModel.find({ _id: id });
  },
};

module.exports = CourseService;
