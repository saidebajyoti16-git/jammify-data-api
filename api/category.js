const createCategoryHandler = require("../lib/category-handler");

module.exports = function handler(req, res) {
  const name = req.query?.name || req.query?.category || "";
  if (!String(name).trim()) {
    return res.status(400).json({
      success: false,
      error: "Missing category. Use /api/category?name=pop",
      example: "/api/category?name=hip-hop",
      categoriesEndpoint: "/api/categories"
    });
  }
  return createCategoryHandler(String(name))(req, res);
};
