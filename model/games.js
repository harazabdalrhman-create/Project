const fs = require("fs");
const path = require("path");
let gamearr = [];
const p = path.join(__dirname, "../", "data", "games.json");    
module.exports =class Game {
  constructor(
    title,
    genre,
    developer,
    platform,
    year,
    badge,
    imageUrl,
    tags,
    description,
  ) {
    this.title = title;
    this.genre = genre;
    this.developer = developer;
    this.platform = platform;
    this.year = year;
    this.badge = badge;
    this.imageUrl = imageUrl;
    this.tags = tags;
    this.description = description;
  }
  save() {
    fs.readFile(p, (err, fileContent) => {
      if (!err) {
        gamearr.push(JSON.parse(fileContent));
        return gamearr;
      }
      gamearr.push(this)
      fs.writeFile(p,JSON.stringify(gamearr),(err)=>{
        console.log(err);
      })
    });
  }
  static fetchAll(cb){
    fs.readFile(p,((err,filecontent)=>{
        if(!err){
        return cb(JSON.parse(filecontent))
        }
          cb([])
     }))

  }
}
