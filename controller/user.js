exports.getHomePage = (req, res, next) => {
  res.render("user/index", {
    pageTitle: "Gaming Hub — Gaming Review Platform ",
  });
};

exports.getGamesPage = (req, res, next) => {
  res.render("user/games.ejs", { pageTitle: "Games — Gaming Hub" });
};
exports.getLibraryPage = (req, res, next) => {
  res.render("user/Library.ejs", { pageTitle: "My Library — Gaming Hub" });
};
