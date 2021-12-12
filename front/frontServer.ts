import * as http from "http";
import esbuild from "esbuild"

// Serves all content from ./dist on :1234.
// If esbuild 404s the request, the request is attempted again
// from `/` assuming that it's an SPA route needing to be handled by the root bundle.
export default async () => {
  const serverDir: string = "front/public"
  const port: number = 3000

  const {host} = await esbuild.serve({ servedir: serverDir }, {})
    .then(req => {
      console.log('start server!')
    })
    .catch(err => {
      console.error('server not work!!')
    })

  // Create a second (proxy) server that will forward requests to esbuild.
  const proxy = http.createServer((req, res) => {
    // forwardRequest forwards an http request through to esbuid.
    const forwardRequest = (path: string) => {
      const options: http.RequestOptions = {
        hostname: host,
        port,
        path,
        method: req.method,
        headers: req.headers,
      };

      const proxyReq = http.request(options, (proxyRes) => {
        if (proxyRes.statusCode === 404) {
          // If esbuild 404s the request, assume it's a route needing to
          // be handled by the JS bundle, so forward a second attempt to `/`.
          return forwardRequest("/");
        }

        // Otherwise esbuild handled it like a champ, so proxy the response back.
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        proxyRes.pipe(res, { end: true });
      });

      req.pipe(proxyReq, { end: true });
    };

    // When we're called pass the request right through to esbuild.
    forwardRequest(req.url);
  });

  // Start our proxy server at the specified `listen` port.
  proxy.listen(listen);
}