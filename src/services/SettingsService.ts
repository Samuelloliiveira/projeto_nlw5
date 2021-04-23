import { getCustomRepository } from 'typeorm';
import {SettingsRepository} from "../repositories/SettingsRepository"

interface ISettingsCreate {
    chat: boolean;
    username: string;
}

class SettingsService{

    async create({chat, username}: ISettingsCreate) {
        const settingsRepository = getCustomRepository(SettingsRepository)
    
        /*findOne busca dentro da tabela somente um registo
        podendo passar condições dentro dele. 
        É o mesmo que o sql Select * from settings where username = "Username" limit 1*/
        const userAlreadyExists = await settingsRepository.findOne({
            username
        })

        if(userAlreadyExists){
            throw new Error("User already exists!")
        }

        const settings = settingsRepository.create({
            chat,
            username,
        })
    
        await settingsRepository.save(settings)

        return settings
    }
}

export {SettingsService}