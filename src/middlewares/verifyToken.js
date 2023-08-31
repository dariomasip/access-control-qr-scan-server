module.exports = (req, res, next) => {
  const authorization = req.get("authorization");
  console.log("🚀 ~ file: verifyToken.js:3 ~ authorization:", authorization);

  let token = "";

  if (!authorization) {
    return res.status(401).json({ error: "Token no encotrado o inválido" });
  }

  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    token = authorization.substring(7);
  }

  if (token !== process.env.TOKEN) {
    return res.status(401).json({ error: "Token no encotrado o inválido" });
  }

  next();
};
