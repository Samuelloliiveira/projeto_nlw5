import { EntityRepository, Repository } from "typeorm"
import { Setting } from "../entities/Setting";

//Ctrl + Enter para ver os metodos de Repository
@EntityRepository(Setting)
class SettingsRepository extends Repository<Setting> {}

export {SettingsRepository}