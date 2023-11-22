import healthcheckController from "../controllers/healthcheck.controller";
import Router from "./_router";

Router.get('/', healthcheckController.hc)