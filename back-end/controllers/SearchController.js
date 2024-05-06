const SearchService = require("../services/SearchService");

const SearchController = {
  addSearch: async (req, res) => {
    const { user_id, content, type, time } = req;
    const isExistHistorySearch = await SearchService.getDetails(user_id);
    if (isExistHistorySearch !== null && isExistHistorySearch.length == 0) {
      const result = await SearchService.addSearch(
        user_id,
        content,
        type,
        time
      );
    } else {
      let new_search_content = [
        ...isExistHistorySearch[0].search_content,
        {
          content,
          type,
          time,
        },
      ];
      if (new_search_content.length > 6) {
        new_search_content.shift();
      }
      const result = await SearchService.updateSearch(
        user_id,
        new_search_content
      );
    }
  },
  getList: async (req, res) => {
    const { user_id } = req.body;
    const result = await SearchService.getList(user_id);
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
  clean: async (req, res) => {
    const { user_id } = req.body;
    const result = await SearchService.clean(user_id);
  },
};

module.exports = SearchController;
