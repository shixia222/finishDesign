const SportPlanModel = require("../model/SportPlanModel");

const SportPlanService = {
  addSportPlan: (user_id, day, plan) => {
    return SportPlanModel.create({
      user_id,
      plan_content: { day, plan },
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
  updateCoursePlan: (user_id, course_plan) => {
    return SportPlanModel.updateOne(
      { user_id },
      {
        plan_content: course_plan,
      }
    ).then((res) => {
      if (res.acknowledged) {
        return "success";
      } else {
        return "failed";
      }
    });
  },
  getDetailsByDay: (user_id, day) => {
    return SportPlanModel.find({
      user_id,
      plan_content: {
        $elemMatch: {
          day,
        },
      },
    });
  },
  getList: (curPage, number, user_id) => {
    return SportPlanModel.find({ user_id }).then((res) => {
      return {
        total: res.length,
        data: res.splice((curPage - 1) * number, number),
      };
    });
  },
  getDetails: (user_id) => {
    return SportPlanModel.find({ user_id: user_id });
  },
};

module.exports = SportPlanService;
