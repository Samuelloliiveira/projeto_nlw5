import {getCustomRepository, Repository} from "typeorm"
import { Connection } from "../entities/Connection"
import {ConnectionsRepository} from "../repositories/ConnectionsRepository"

interface IConnectionCreate {
    socket_id: string;
    user_id: string;
    admin_id?: string;
    id?: string;
}

class ConnectionsService {
    private connectionsRepostory: Repository<Connection>

    constructor() {
        this.connectionsRepostory = getCustomRepository(ConnectionsRepository)
    }

    async create({socket_id, user_id, admin_id, id}: IConnectionCreate) {
        const connection = this.connectionsRepostory.create({
            socket_id,
            user_id,
            admin_id,
            id
        })

        await this.connectionsRepostory.save(connection)

        return connection
    }
}

export{ConnectionsService}