import { IResponse } from '../types/index'
import ModelUsers from '../models/users'
import { json } from 'stream/consumers'

export class ControllerUser {

    static getList(): Promise<IResponse> {
        return new Promise((resolve, rejects) => {
            resolve({
                statusCode: 200,
                contentType: 'application/json',
                data: JSON.stringify(ModelUsers.getList())
            })
        })
    }

}
