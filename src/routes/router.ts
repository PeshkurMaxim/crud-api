import { IncomingMessage, ServerResponse } from 'http';
import { ControllerUser } from '../controllers/users';
import { IUserResponse } from '../types/index'

export function appRouter(req: IncomingMessage, res: ServerResponse) : void {

    let result: Promise<IUserResponse> = new Promise((resolve, reject) => {});

    switch (req.url) {
        case '/api/users': {
          if (req.method === 'GET') {
            result = ControllerUser.getList();
          }
          break;
        }

        default: {
            result = new Promise((resolve, reject) => {throw new Error("Page not found")});
        }
    }

    result
        .then( response => {
            res.statusCode = response.statusCode;
            res.setHeader("Content-Type", response.contentType);
            res.end(JSON.stringify(response.data));
        })
        .catch( (err: Error) => {
            res.statusCode = 404;
            res.end(err.message);
        })

}