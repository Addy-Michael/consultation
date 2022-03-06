exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.body.role)) {
      res.status(405).json({
        status: "failed",
        message: "sorry you are unauthorized",
      });
    }
    next();
  };
};
