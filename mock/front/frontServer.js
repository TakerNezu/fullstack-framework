var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
import http from "http";
import { serve } from "esbuild";
(() => __async(this, null, function* () {
  const serverDir = "front/public";
  const port = 3e3;
  let startedServer;
  yield serve({ servedir: serverDir }, {}).then((result) => {
    startedServer = result;
    console.log("start server!");
  }).catch((err) => {
    console.error(err);
  });
  const proxy = http.createServer((req, res) => {
    var _a;
    const forwardRequest = (path) => {
      const options = {
        hostname: startedServer.host,
        port: startedServer.port,
        path,
        method: req.method,
        headers: req.headers
      };
      const proxyReq = http.request(options, (proxyRes) => {
        var _a2;
        if (proxyRes.statusCode === 404) {
          return forwardRequest("/");
        }
        res.writeHead((_a2 = proxyRes.statusCode) != null ? _a2 : 505, proxyRes.headers);
        proxyRes.pipe(res, { end: true });
      });
      req.pipe(proxyReq, { end: true });
    };
    forwardRequest((_a = req.url) != null ? _a : "");
  });
  proxy.listen(port);
}))();
