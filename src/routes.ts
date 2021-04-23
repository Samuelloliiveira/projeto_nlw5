import {Router} from "express"
import { SettingsController } from "./controllers/SettingsController"
import { UsersController } from "./controllers/UsersController"

const routes = Router()

const settingsController = new SettingsController()
const usersCOntroller = new UsersController()

routes.post("/settings", settingsController.create)
routes.post("/users", usersCOntroller.create)

export{routes}