import { IResponse } from '../types/index';
import ModelUsers from '../models/users';
import { version as uuidVersion, validate as uuidValidate } from 'uuid';
class ControllerUser {

    public getList(): Promise<IResponse> {
        return new Promise((resolve, rejects) => {
            resolve({
                statusCode: 200,
                contentType: 'application/json',
                data: JSON.stringify(ModelUsers.getList())
            });
        })
    }

    public getById(id: string): Promise<IResponse> {
        
        return new Promise((resolve, rejects) => {

            let result: IResponse = {
                statusCode: 404,
                contentType: 'text/plain; charset=UTF-8',
                data: "Page not found"
            };

            if (this.uuidValidateV4(id)) {

                const data = ModelUsers.getById(id);

                if (data) {

                    result = {
                        statusCode: 200,
                        contentType: 'application/json',
                        data: JSON.stringify(data)
                    };

                }

            } else {

                result = {
                    statusCode: 400,
                    contentType: 'text/plain; charset=UTF-8',
                    data: "Invalid id"
                };

            }


            resolve(result);

        })
    }


    private uuidValidateV4(uuid: string): boolean {
        return uuidValidate(uuid) && uuidVersion(uuid) === 4;
    }

}

export default new ControllerUser;