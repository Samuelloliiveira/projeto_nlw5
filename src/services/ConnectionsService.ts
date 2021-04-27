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

    async findByUserId(user_id: string) {
        const connection = await this.connectionsRepostory.findOne({
            user_id
        })

        return connection
    }

    async findAllWithoutAdmin() {
        const connections = await this.connectionsRepostory.find({
            where: {admin_id: null},
            relations: ["user"],
        })

        return connections
    }

    async findBySocketID(socket_id: string) {
        const connection = await this.connectionsRepostory.findOne({
            socket_id
        })

        return connection
    }

    async updateAdminID(user_id: string, admin_id: string) {
        await this.connectionsRepostory.createQueryBuilder()
            .update(Connection)
            .set({admin_id})
            .where("user_id = :user_id", {//os dois pontos(:) define que é um parametro
                user_id,
            })
            .execute()
    }        
}

export{ConnectionsService}