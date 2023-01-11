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

                    if (this.validateUser(user)) {
    
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


    public update(id: string, request: IncomingMessage): Promise<IResponse> {
        
        return new Promise((resolve, reject) => {

            if (this.uuidValidateV4(id)) {

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
    
                        if (this.validateUser(user)) {

                            const result = ModelUsers.update(user);

                            if (result) {

                                resolve({
                                    statusCode: 200,
                                    contentType: 'application/json',
                                    data: JSON.stringify(result)
                                });

                            } else {

                                resolve({
                                    statusCode: 400,
                                    contentType: 'text/plain; charset=UTF-8',
                                    data: "Page not found"
                                });

                            }
        
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

            } else {

                resolve({
                    statusCode: 400,
                    contentType: 'text/plain; charset=UTF-8',
                    data: "Invalid id"
                });

            }
        })
    }


    private uuidValidateV4(uuid: string): boolean {
        return uuidValidate(uuid) && uuidVersion(uuid) === 4;
    }

    private validateHobbies(arr: Array<any>): boolean {
        if (arr.length == 0) return true;

        return arr.every(i => typeof i === "string")
    }

    private validateUser(obj: IUser): boolean {
        return (
            obj.hasOwnProperty("username") && typeof obj.username == 'string' 
            && obj.hasOwnProperty("age") && typeof obj.age == 'number'
            && obj.hasOwnProperty("hobbies") && this.validateHobbies(obj.hobbies)
        )
    }
}

export default new ControllerUser;