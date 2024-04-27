const UserModel = require("../model/UserModel");

const UserService = {
  addUser: (openid, username, header) => {
    return UserModel.create({
      openid,
      username,
      mobile: "",
      email: "",
      header,
      gender: "",
      city: "",
      age: "",
      weight: "",
      height: "",
      body_fat: "",
      introduce: "",
    })
      .then((res) => {
        const { _id } = res;
        console.log(_id);
        return {
          success: true,
          // data: data,
        };
      })
      .catch((err) => {
        return err;
      });
  },
  // deleteUser: (id) => {
  //   return UserModel.deleteOne({ _id: id }).then((res) => {
  //     RecordModel.deleteOne({ userId: id });
  //     AskModel.deleteOne({ userId: id });
  //     AnswerModel.deleteOne({ userId: id });
  //     if (res.deletedCount == 1) {
  //       return "success";
  //     } else {
  //       return "failed";
  //     }
  //   });
  // },
  updateUser: (
    openid,
    username,
    mobile,
    email,
    header,
    gender,
    city,
    age,
    weight,
    height,
    body_fat,
    introduce
  ) => {
    return UserModel.updateOne(
      { openid },
      {
        username,
        mobile,
        email,
        header,
        gender,
        city,
        age,
        weight,
        height,
        body_fat,
        introduce,
      }
    ).then((res) => {
      if (res.acknowledged) {
        return "success";
      } else {
        return "failed";
      }
    });
  },
  // signIn: (account, password) => {
  //   return UserModel.find({ account: account, password: password }, ["_id", "username", "gender", "height"]).then(
  //     (res) => {
  //       if (res.length === 1) {
  //         const { _id, username, gender, height } = res[0];
  //         const data = {
  //           id: _id,
  //           username: username,
  //           gender: gender,
  //           height: height,
  //         };
  //         return {
  //           success: true,
  //           data: data,
  //         };
  //       } else {
  //         return "failed";
  //       }
  //     }
  //   );
  // },
  // getList: (curPage, number) => {
  //   return UserModel.find().then((res) => {
  //     return { total: res.length, data: res.splice((curPage - 1) * number, number) };
  //   });
  // },
  getDetails: (openid) => {
    return UserModel.find({ openid: openid });
  },
};

module.exports = UserService;
