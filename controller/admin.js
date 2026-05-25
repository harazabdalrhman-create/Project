const path = require("path");
exports.getAdminDash = (erq, res, next) => {
  res.render("admin/admin-dashboard", {
    pageTitle: "Admin Dashboard — Gaming Hub",
  });
};

exports.getAdminGames = (erq, res, next) => {
  res.render("admin/admin-games", {
    pageTitle: "All Games — Admin Panel",
  });
};
exports.getAdminAddGames = (erq, res, next) => {
  res.render("admin/admin-add-game", {
    pageTitle: "Add Game — Admin Panel",
  });
};
