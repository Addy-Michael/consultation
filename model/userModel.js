const path = require("path");
const fs = require("fs");
const p = path.join(__dirname, "..", "data", "users.json");
let result;

class Users {
  constructor(name, id, age, role, password) {
    this.name = name;
    this.uniqueId = id;
    this.age = age;
    this.role = role;
    this.password = password;
  }

  //   ADD RECORD
  addUsers(cb) {
    let users = [];
    const data = this;

    fs.readFile(p, (err, data) => {
      if (err) {
        console.error(err);
        return {
          status: "failed",
          data: "Sorry, cant proceed",
        };
      }

      users = JSON.parse(data);
      users.push(this);

      const save = fs.writeFile(p, JSON.stringify(users), (err) => {
        if (err) {
          cb({
            status: "failed",
            data: "Sorry, cant add user",
          });
        }

        cb({
          status: "success",
          data: this,
        });
      });
    });
  }

  //   GET ALL USERS
  getAllUsers(cb) {
    fs.readFile(p, (err, data) => {
      if (err) {
        cb({
          status: "failed",
          data: "Sorry, cant proceed",
        });
      }

      cb({ status: "success", data: JSON.parse(data) });
    });
  }

  //   GET SINGLE USER
  getUser(cb, id) {
    fs.readFile(p, (err, data) => {
      if (err) {
        cb({
          status: "failed",
          data: "Sorry, cant proceed",
        });
      }

      cb({
        status: "success",
        data: JSON.parse(data).filter((rec) => rec.uniqueId == id),
      });
    });
  }

  //   DELETE SINGLE USER
  deleteUser(cb, id) {
    let record = [];

    fs.readFile(p, (err, data) => {
      if (err) {
        console.error(err);
        return {
          status: "failed",
          data: "Sorry, user does not exist",
        };
      }

      record = JSON.parse(data).filter((rec) => rec.uniqueId != id);
      record.push(this);

      const save = fs.writeFile(p, JSON.stringify(record), (err) => {
        if (err) {
          cb({
            status: "failed",
            data: "Sorry, user cant be deleted",
          });
        }

        cb({
          status: "success",
          message: "User deleted",
        });
      });
    });
  }

  editUser(cb, id) {
    let user = [];

    fs.readFile(p, (err, data) => {
      if (err) {
        console.error(err);
        return {
          status: "failed",
          data: "Sorry, user cant be found",
        };
      }

      user = JSON.parse(data).map((rec) => {
        if (rec.uniqueId == id) {
          return this;
        } else {
          return rec;
        }
      });

      const save = fs.writeFile(p, JSON.stringify(user), (err) => {
        if (err) {
          cb({
            status: "failed",
            data: "Sorry, cant edit user",
          });
        }

        cb({
          status: "success",
          user: user.filter((rec) => rec.uniqueId == id),
        });
      });
    });
  }
}

module.exports = Users;
