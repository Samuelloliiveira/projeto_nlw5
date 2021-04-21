import {Router} from "express"
import { SettingsController } from "./constrollers/SettingsController"

const routes = Router()

const settingsController = new SettingsController()

routes.post("/settings", settingsController.create)

export{routes}