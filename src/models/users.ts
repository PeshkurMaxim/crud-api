import { IUser } from '../types/index'


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