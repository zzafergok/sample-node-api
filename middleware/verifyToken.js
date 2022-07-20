function verifyToken(req, res, next) {
  //! first way
  const authorization = req.headers["Authorization"];

  if (!authorization) {
    res.status(401).send("Unauthorized. No token provided");
    return;
  }

  const token = authorization.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).send("Unauthorized. Invalid token");
      return;
    }

    req.userId = decoded._id;
    next();
  });

  //! second way
  // const bearerHeader = req.headers["Authorization"];
  // if (typeof bearerHeader !== "undefined") {
  //   const bearer = bearerHeader.split(" ");
  //   const bearerToken = bearer[1];
  //   req.token = bearerToken;
  //   next();
  // } else {
  //   res.sendStatus(403);
  // }
}

module.exports = verifyToken;
