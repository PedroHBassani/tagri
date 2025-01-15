const jwt = require("jsonwebtoken");
const { error } = require("../utils/response.js");

const openRoutes = ["/usuario/entrar", "/usuario/estou_logado"];

const message = "Você não tem permissão para acessar este recurso.";

const authMiddleware = (req, res, next) => {
  if (openRoutes.includes(req.path)) {
    return next();
  }

  var token = req.header("Authorization");
  if (!token) {
    return error(res, message, 401);
  }
  token = token.replace("Bearer ", "");
  if (!token) {
    return error(res, message, 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (ex) {
    return error(res, message, 401);
  }
};

module.exports = authMiddleware;
