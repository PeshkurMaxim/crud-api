export interface IUser {
    id: string // uuid
    username: string
    age: number
    hobbies: string[] | void[]
}

export interface IResponse {
    statusCode: number
    contentType: string
    data: string
}