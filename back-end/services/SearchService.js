const SearchModel = require("../model/SearchModel");

const SearchService = {
  addSearch: (user_id, content, type, time) => {
    return SearchModel.create({
      user_id,
      search_content: {
        content,
        type,
        time,
      },
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
  updateSearch: (user_id, search_content) => {
    return SearchModel.updateOne(
      { user_id },
      {
        search_content,
      }
    ).then((res) => {
      if (res.acknowledged) {
        return "success";
      } else {
        return "failed";
      }
    });
  },
  getList: (user_id) => {
    return SearchModel.find({ user_id }).then((res) => {
      return {
        data: res,
      };
    });
  },
  getDetails: (user_id) => {
    return SearchModel.find({ user_id });
  },
  clean: (user_id) => {
    return SearchModel.updateOne(
      { user_id },
      {
        search_content: [],
      }
    );
  },
};

module.exports = SearchService;
