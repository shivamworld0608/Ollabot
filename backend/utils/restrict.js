 export const restrictTo = (...allowedTypes) => {
  return (req, res, next) => {
    if (!req.user || !allowedTypes.includes(req.user.userType)) {
      return res.status(403).json({ message: "Access forbidden: You do not have permission to access this resource." });
    }
    next();
  };
};