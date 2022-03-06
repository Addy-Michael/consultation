const User = require("../model/userModel");

exports.addUser = (req, res) => {
  const { name, uniqueId, age, role, password } = req.body;

  let user = new User(name, uniqueId, age, role, password);

  user.addUsers((p) => {
    if (p.status == "success") {
      res.status(200).json(p);
    } else {
      res.status(404).json(p);
    }
  });
};

exports.getAllUsers = (req, res) => {
  let user = new User();

  user.getAllUsers((p) => {
    if (p.status == "success") {
      res.status(200).json(p);
    } else {
      res.status(404).json(p);
    }
  });
};

exports.getUser = (req, res) => {
  let user = new User();

  user.getUser((p) => {
    if (p.status == "success") {
      res.status(200).json(p);
    } else {
      res.status(404).json(p);
    }
  }, req.params.id);
};

exports.deletUser = (req, res) => {
  let user = new User();

  user.deleteUser((p) => {
    if (p.status == "success") {
      res.status(200).json(p);
    } else {
      res.status(404).json(p);
    }
  }, req.params.id);
};

exports.updateUser = (req, res) => {
  const { name, uniqueId, age, role, password } = req.body;

  let user = new User(name, uniqueId, age, role, password);

  user.editUser((p) => {
    if (p.status == "success") {
      res.status(200).json(p);
    } else {
      res.status(404).json(p);
    }
  }, req.params.id);
};
