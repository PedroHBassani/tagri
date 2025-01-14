/**
 * Envia uma resposta de sucesso.
 * @param {import('express').Response} res - O objeto de resposta.
 * @param {string} [message=""] - A mensagem de sucesso.
 * @param {Object} [data=null] - Os dados a serem enviados na resposta.
 * @returns {import('express').Response} O objeto de resposta.
 */
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

/**
 * Envia uma resposta de erro.
 * @param {import('express').Response} res - O objeto de resposta.
 * @param {string} [message="Error"] - A mensagem de erro.
 * @param {number} [statusCode=500] - O código de status.
 * @returns {import('express').Response} O objeto de resposta.
 */
const error = (res, message = "Error", statusCode = 400) => {
  console.error(`Error: ${message}, Status Code: ${statusCode}`);
  return res.status(statusCode).json({
    code: statusCode,
    status: "error",
    message,
  });
};

/**
 * Envia uma resposta de erro do servidor.
 * @param {import('express').Response} res - O objeto de resposta.
 * @param {Error} err - O objeto de erro.
 * @param {string} [message="Server Error"] - A mensagem de erro.
 * @returns {import('express').Response} O objeto de resposta.
 */
const serverError = (res, err, message = "Server Error") => {
  console.error(`Server Error: ${err.message}`);
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
