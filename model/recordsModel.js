const path = require("path");
const fs = require("fs");
const p = path.join(__dirname, "..", "data", "record.json");
let result;

class Records {
  constructor(name, id, age, compliants) {
    this.name = name;
    this.uniqueId = id;
    this.age = age;
    this.compliants = compliants;
  }

  //   ADD RECORD
  addRecords(cb) {
    let record = [];
    const data = this;

    fs.readFile(p, (err, data) => {
      if (err) {
        console.error(err);
        return {
          status: "failed",
          data: "Sorry, cant proceed",
        };
      }

      record = JSON.parse(data);
      record.push(this);

      const save = fs.writeFile(p, JSON.stringify(record), (err) => {
        if (err) {
          cb({
            status: "failed",
            data: "Sorry, cant proceed",
          });
        }

        cb({
          status: "success",
          data: this,
        });
      });
    });
  }

  //   GET ALL RECORDS
  getAllRecords(cb) {
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

  //   GET SINGLE RECORD
  getRecord(cb, id) {
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

  //   DELETE SINGLE RECORD
  deleteRecord(cb, id) {
    let record = [];

    fs.readFile(p, (err, data) => {
      if (err) {
        console.error(err);
        return {
          status: "failed",
          data: "Sorry, record does not exist",
        };
      }

      record = JSON.parse(data).filter((rec) => rec.uniqueId != id);
      record.push(this);

      const save = fs.writeFile(p, JSON.stringify(record), (err) => {
        if (err) {
          cb({
            status: "failed",
            data: "Sorry, record cant be deleted",
          });
        }

        cb({
          status: "success",
          message: "Record deleted",
        });
      });
    });
  }

  editRecord(cb, id) {
    let record = [];

    fs.readFile(p, (err, data) => {
      if (err) {
        console.error(err);
        return {
          status: "failed",
          data: "Sorry, record cant be found",
        };
      }

      console.log(this);

      record = JSON.parse(data).map((rec) => {
        if (rec.uniqueId == id) {
          return this;
        } else {
          return rec;
        }
      });

      const save = fs.writeFile(p, JSON.stringify(record), (err) => {
        if (err) {
          cb({
            status: "failed",
            data: "Sorry, cant be edited",
          });
        }

        cb({
          status: "success",
          record: record.filter((rec) => rec.uniqueId == id),
        });
      });
    });
  }
}

module.exports = Records;
