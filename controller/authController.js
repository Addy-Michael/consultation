exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    console.log(req.body);
    if (!roles.includes(req.body.role)) {
      res.status(405).json({
        status: "failed",
        message: "sorry you are unauthorized",
      });
    }
    next();
  };
};
