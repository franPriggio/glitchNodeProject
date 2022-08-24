import { ReadMessages } from '../../servicio/handleMessages/read_messages.js'
import { SaveMessages } from '../../servicio/handleMessages/save_messages.js'

export class HandleMessages {
  
    constructor() {
        this.messages = [];
    }

    static dbQuery = new ReadMessages();
    static dbSave = new SaveMessages();

    async getAll() {
        return dbQuery.getMessages();
    }

    async save(object) {
        try {
            dbSave.saveMessage(object)
        } catch (error) {
            console.error("Error al guardar objeto en archivo", error);
        }
    }
}