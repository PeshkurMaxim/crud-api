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
        this.dbUsers = testUsers;

    }

    public getList():IUser[] {
        return this.dbUsers;
    }

    public getById(id:string):IUser {

        return this.dbUsers.filter((user: IUser) => {
            return user.id === id;
        })[0];
        
    }

}


export default new ModelUser();