import {Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn} from "typeorm"
import {v4 as uuid} from "uuid"

@Entity("settings")
class Setting {

    @PrimaryColumn()//Não precisa passar como paramentro, pois nomeamos as entidades igual a tabela BD
    id: string;

    @Column()
    username: string;

    @Column()
    chat: boolean;

    @UpdateDateColumn()
    updated_at: Date;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if(!this.id) {
            this.id = uuid()
        }
    }
}

export {Setting}