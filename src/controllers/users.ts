import { IUser, IResponse } from '../types/index';
import ModelUsers from '../models/users';
import { version as uuidVersion, validate as uuidValidate } from 'uuid';
import { IncomingMessage, ServerResponse } from 'http';


class ControllerUser {

    public getList(): Promise<IResponse> {
        return new Promise((resolve, reject) => {
            resolve({
                statusCode: 200,
                contentType: 'application/json',
                data: JSON.stringify(ModelUsers.getList())
            });
        })
    }

    public getById(id: string): Promise<IResponse> {
        
        return new Promise((resolve, reject) => {

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


    public create(request: IncomingMessage): Promise<IResponse> {
        return new Promise((resolve, reject) => {
            
            let data = "";
            
            request.on("data", chunk => {
                try {
                    data += chunk;
                } catch (error) {
                    reject(error)
                }
            });

            request.on("end", () => {

                try {

                    const user = <IUser>JSON.parse(data);

                    if (
                        user.hasOwnProperty("username") && typeof user.username == 'string' 
                        && user.hasOwnProperty("age") && typeof user.age == 'number'
                        && user.hasOwnProperty("hobbies") && this.validateHobbies(user.hobbies)
                    ) {
    
                        resolve({
                            statusCode: 201,
                            contentType: 'application/json',
                            data: JSON.stringify(ModelUsers.create(user))
                        });
    
                    } else {
    
                        resolve({
                            statusCode: 400,
                            contentType: 'text/plain; charset=UTF-8',
                            data: "Invalid data"
                        });
    
                    }
                    
                } catch (err) {
                    reject(err)
                }
                
            });

            request.on('error', (err) => reject(new Error(err.message)));
        })
    }


    private uuidValidateV4(uuid: string): boolean {
        return uuidValidate(uuid) && uuidVersion(uuid) === 4;
    }

    private validateHobbies(arr: Array<any>): boolean {
        if (arr.length == 0) return true;

        return arr.every(i => typeof i === "string")
    }
}

export default new ControllerUser;