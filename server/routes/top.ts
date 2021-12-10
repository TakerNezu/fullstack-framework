import fastify, {FastifyPluginCallback} from "fastify";

export const top: FastifyPluginCallback = (fastify, _, done) => {
  // fastify.addHook("onRequest", (request) => request.jwtVerify());

  fastify.get("/", (req, reply) => {
    reply.send('Success!')
  });

  done();
};