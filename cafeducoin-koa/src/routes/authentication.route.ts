import Router from "./_router";
import authenticationController from "../controllers/authentication.controller";

Router.post('/register', authenticationController.register);
Router.post('/login', authenticationController.login);
