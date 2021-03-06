import { getCustomRepository, Repository } from 'typeorm';
import { Setting } from '../entities/Setting';
import {SettingsRepository} from "../repositories/SettingsRepository"

interface ISettingsCreate {
    chat: boolean;
    username: string;
}

class SettingsService{
    private settingsRepository: Repository<Setting>

    constructor() {
        this.settingsRepository = getCustomRepository(SettingsRepository)
    }

    async create({chat, username}: ISettingsCreate) {
    
        /*findOne busca dentro da tabela somente um registo
        podendo passar condições dentro dele. 
        É o mesmo que o sql Select * from settings where username = "Username" limit 1*/
        const userAlreadyExists = await this.settingsRepository.findOne({
            username
        })

        if(userAlreadyExists){
            throw new Error("User already exists!")
        }

        const settings = this.settingsRepository.create({
            chat,
            username,
        })
    
        await this.settingsRepository.save(settings)

        return settings
    }

    async findByUsername(username: string) {
        const settings = await this.settingsRepository.findOne({
            username,
        })

        return settings
    }

    async update(username: string, chat: boolean) {
        await this.settingsRepository.createQueryBuilder().
            update(Setting)
            .set({chat})
            .where("username = :username", {//os dois pontos(:) define que é um parametro
                username,
            })
            .execute()
    }
}

export {SettingsService}