import { IUserResponse } from '../types/index'
import ModelUsers from '../models/users'

export class ControllerUser {

    static getList(): Promise<IUserResponse> {
        return new Promise((resolve, rejects) => {
            resolve({
                statusCode: 200,
                contentType: 'application/json',
                data: ModelUsers.getList()
            })
        })
    }

}
