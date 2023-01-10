import { IncomingMessage, ServerResponse } from 'http';
import { ControllerUser } from '../controllers/users';
import { IResponse } from '../types/index'

export function appRouter(req: IncomingMessage, res: ServerResponse) : void {

    let result: Promise<IResponse> = new Promise((resolve, reject) => {});

    switch (req.url) {
        case '/api/users': {
          if (req.method === 'GET') {
            result = ControllerUser.getList();
          }
          break;
        }

        default: {
            result = new Promise((resolve, reject) => {
                resolve({
                    statusCode: 404,
                    contentType: 'text/plain; charset=UTF-8',
                    data: "Page not found"
                })
            });
        }
    }

    result
        .then( response => {
            res.statusCode = response.statusCode;
            res.setHeader("Content-Type", response.contentType);
            res.end(response.data);
        })
        .catch( (err: Error) => {
            res.statusCode = 500;
            res.end("Internal Server Error");
        })

}