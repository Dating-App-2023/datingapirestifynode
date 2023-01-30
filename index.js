const restify = require("restify");
const { RtcTokenBuilder, RtcRole } = require("agora-access-token");
const server = restify.createServer();
// Middleware
server.use(restify.plugins.bodyParser());
server.post("/generate_access_token/", (req, res, next) => {
  const { channel, role } = req.body;
  if (!channel) {
    return res.send(400);
  }
  // get role
  let callRole = RtcRole.SUBSCRIBER;
  if (role === "publisher") {
    callRole = RtcRole.PUBLISHER;
  }
  let expireTime = 3600;
  let uid = 0;
  // calculate privilege expire time
  const currentTime = Math.floor(Date.now() / 1000);
  const privilegeExpireTime = currentTime + expireTime;
  const token = RtcTokenBuilder.buildTokenWithUid(
    'fdea1b8565cf4c08857a0cf73a9c81af',
    '7623f2b2f64e4e07bfbc3a86dd88ede4',
    channel,
    uid,
    callRole,
    privilegeExpireTime
  );
  res.send({ token });
});
server.listen(process.env.PORT || 42727);
