const catchErrors = fn => async (req, res, next) => {
  try {
    return await fn(req, res, next);
  } catch (error) {
    console.error('Error:', error);
    return next(error);
  }
};

module.exports = catchErrors;
