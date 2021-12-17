import http from "http";
import {serve, ServeResult} from "esbuild"

(async () => {
  const serverDir: string = "front/public"
  const port: number = 3000

  let startedServer: ServeResult

  // サーバーの起動
  await serve({ servedir: serverDir }, {})
    .then(result => {
      startedServer = result
      console.log('start server!')
    })
    .catch(err => {
      console.error(err)
    })

  const proxy = http.createServer((req, res) => {
    const forwardRequest = (path: string) => {
      const options: http.RequestOptions = {
        hostname: startedServer.host,
        port: startedServer.port,
        path,
        method: req.method,
        headers: req.headers,
      };

      const proxyReq = http.request(options, (proxyRes) => {
        if (proxyRes.statusCode === 404) {
          return forwardRequest("/");
        }

        res.writeHead(proxyRes.statusCode ?? 505, proxyRes.headers);
        proxyRes.pipe(res, { end: true });
      });

      req.pipe(proxyReq, { end: true });
    };

    forwardRequest(req.url ?? "");
  });

  // Start our proxy server at the specified `listen` port.
  proxy.listen(port);
})()