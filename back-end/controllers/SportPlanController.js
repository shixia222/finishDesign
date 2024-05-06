const SportPlanService = require("../services/SportPlanService");
const CourseService = require("../services/CourseService");

const SportPlanController = {
  addSportPlan: async (req, res) => {
    const { user_id, plan_content } = req.body;
    const { day, plan } = plan_content;
    const isExistCoursePlan = await SportPlanService.getDetails(user_id);
    if (isExistCoursePlan !== null && isExistCoursePlan.length == 0) {
      const result = await SportPlanService.addSportPlan(user_id, day, plan);
      if (result.success) {
        res.send({
          data: result.data,
          success: true,
        });
      } else {
        res.send({ success: false, reason: result.message });
      }
    } else {
      const course_day = await SportPlanService.getDetailsByDay(user_id, day);
      if (course_day.length !== 0) {
        const new_course_plan = isExistCoursePlan[0].plan_content.map(
          (item) => {
            if (item.day == day) {
              return {
                _id: item._id,
                day: item.day,
                plan: [...item.plan, plan],
              };
            } else {
              return item;
            }
          }
        );
        const result = await SportPlanService.updateCoursePlan(
          user_id,
          new_course_plan
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
        const new_course_plan = [
          ...isExistCoursePlan[0].plan_content,
          plan_content,
        ];
        const result = await SportPlanService.updateCoursePlan(
          user_id,
          new_course_plan
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
    }
  },
  getList: async (req, res) => {
    const { curPage, number, user_id } = req.body;
    const result = await SportPlanService.getList(curPage, number, user_id);
    if (result.data.length != 0) {
      const new_plan_list = await Promise.all(
        result.data[0].plan_content.map(async (item) => {
          return {
            day: item.day,
            // 使用 flatMap 函数将 plan 数组展开
            plan: (
              await Promise.all(
                item.plan.map(async (planItem) => {
                  return await CourseService.getDetails(planItem);
                })
              )
            ).flat(), // 使用 flat() 函数将嵌套的数组展平
          };
        })
      );
      res.send({
        success: true,
        total: result.total,
        data: new_plan_list,
      });
    } else {
      res.send({
        success: false,
      });
    }
  },
  getDetails: async (req, res) => {
    const { user_id } = req.body;
    const result = await SportPlanService.getDetails(user_id);
    res.send(result);
  },
};

module.exports = SportPlanController;
