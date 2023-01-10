import { IUser } from '../types/index';
import { v4 as uuidv4 } from 'uuid';

let testUsers = [
    {
        id: uuidv4(),
        username: 'test user',
        age: 20,
        hobbies: []
    }
]


class ModelUser {

    private dbUsers:IUser[];


    constructor(){
        this.dbUsers = [];
    }

    public getList():IUser[] {
        return this.dbUsers;
    }

}


export default new ModelUser();