import { Server } from "@hapi/hapi";
import { PostController } from "../controllers/post.controller.js";
import { AuthInterceptor } from "../middleware/auth.interceptor.js";

export class PostRouter {
  private controller: PostController;
  private authInterceptor: AuthInterceptor;

  constructor(controller: PostController) {
    this.controller = controller;
    this.authInterceptor = new AuthInterceptor();
  }

  async configureRoutes(server: Server) {
    server.route({
      method: "POST",
      path: "/post/create",
      handler: this.controller.createPost.bind(this.controller),
      options: {
        pre: [
          { method: this.authInterceptor.authorization },
          { method: this.authInterceptor.authentication },
        ],
      },
    });
  }
}