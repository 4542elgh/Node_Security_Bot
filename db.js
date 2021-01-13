class db {
  constructor() {
    this.sqlite3 = require("sqlite3").verbose();
    this.dbconn = new this.sqlite3.Database("./db/blog.db");
  }

  createDatabase() {
    let dbconnLocal = this.dbconn;
    dbconnLocal.serialize(function () {
      dbconnLocal.run(
        "CREATE TABLE blogs (id INTEGER PRIMARY KEY AUTOINCREMENT, announced_date TEXT, title TEXT, link TEXT, description TEXT, author TEXT, subtitle TEXT, available TEXT, issues TEXT)"
      );
    });
  }

  insertIntoBlog(inputArr) {
    var stmt = this.dbconn.prepare(
      "INSERT INTO blogs ('announced_date' , 'title' , 'link' , 'description' , 'author' , 'subtitle' , 'available' , 'issues' ) VALUES (?,?,?,?,?,?,?,?)"
    );
    for (var i = 0; i < inputArr.length; i++) {
      let keys = Object.keys(inputArr[i]);
      let values = [];
      keys.forEach((key) => {
        values.push(inputArr[i][key]);
      });
      stmt.run(values);
    }
    stmt.finalize();
  }

  showBlog(callback) {
    this.dbconn.all("SELECT * FROM blogs", function (err, rows) {
      if (err) {
        console.err("Something wrong happened");
      } else {
        callback(rows);
      }
    });
  }

  close() {
    this.dbconn.close();
  }
}

module.exports = db;
