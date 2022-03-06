const Record = require("../model/recordsModel");

exports.addRecord = (req, res) => {
  const { name, uniqueId, age, compliants } = req.body;

  let record = new Record(name, uniqueId, age, compliants);

  record.addRecords((p) => {
    if (p.status == "success") {
      res.status(200).json(p);
    } else {
      res.status(404).json(p);
    }
  });
};

exports.getAllRecords = (req, res) => {
  let record = new Record();

  record.getAllRecords((p) => {
    if (p.status == "success") {
      res.status(200).json(p);
    } else {
      res.status(404).json(p);
    }
  });
};

exports.getRecord = (req, res) => {
  let record = new Record();

  record.getRecord((p) => {
    if (p.status == "success") {
      res.status(200).json(p);
    } else {
      res.status(404).json(p);
    }
  }, req.params.id);
};

exports.deletRecord = (req, res) => {
  let record = new Record();

  record.deleteRecord((p) => {
    if (p.status == "success") {
      res.status(200).json(p);
    } else {
      res.status(404).json(p);
    }
  }, req.params.id);
};

exports.updateRecord = (req, res) => {
  const { name, uniqueId, age, compliants } = req.body;

  let record = new Record(name, req.params.id, age, compliants);

  record.editRecord((p) => {
    if (p.status == "success") {
      res.status(200).json(p);
    } else {
      res.status(404).json(p);
    }
  }, req.params.id);
};
