const success = (res, message = "", data = null) => {
  let response = {
    status: "success",
  };
  if (message) {
    response.message = message;
  }
  if (data) {
    response.data = data;
  }
  return res.status(200).json(response);
};

const error = (res, message = "Error", statusCode = 500) => {
  return res.status(statusCode).json({
    code: statusCode,
    status: "error",
    message,
  });
};

const serverError = (res, err, message = "Server Error") => {
  console.log(err);
  return res.status(500).json({
    code: 500,
    status: "error",
    message,
  });
};

module.exports = {
  success,
  error,
  serverError,
};
