import { ReadMessages } from '../../servicio/handleMessages/read_messages.js'
import { SaveMessages } from '../../servicio/handleMessages/save_messages.js'

export class HandleMessages {
  
    constructor() {
        this.messages = [];
    }

    async getAll() {
        const dbQuery = new ReadMessages();
        return dbQuery.getMessages();
    }

    async save(object) {
        const  dbSave = new SaveMessages();
        try {
            dbSave.saveMessage(object)
        } catch (error) {
            console.error("Error al guardar objeto en archivo", error);
        }
    }
}