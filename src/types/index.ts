export interface IUser {
    id: string // uuid
    username: string
    age: number
    hobbies: string[] | void[]
}

export interface IUserResponse {
    statusCode: number
    contentType: string
    data: IUser[] | void[]
}