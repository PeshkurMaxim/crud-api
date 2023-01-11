import { IncomingMessage, ServerResponse } from 'http';
import ControllerUser from '../controllers/users';
import { IResponse } from '../types/index'

export function appRouter(req: IncomingMessage, res: ServerResponse) : void {

    let result: Promise<IResponse> = new Promise((resolve, reject) => {});

    let routeUrl = '';

    if (typeof req.url == 'string')
        routeUrl = routerRegex(req.url);
            
    

    switch (routeUrl) {
        case '/api/users': {
          
            if (req.method === 'GET') {
                result = ControllerUser.getList();
            }

            

            break;
        }

        case '/api/users/:id': {
            
            if (req.method === 'GET') {
                const id = getArgFromUrl(String(req.url));

                result = ControllerUser.getById(id);
            }
            
            break;
        }

        default: {
            result = new Promise((resolve, reject) => {
                resolve({
                    statusCode: 404,
                    contentType: 'text/plain; charset=UTF-8',
                    data: "Page not found"
                });
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

function routerRegex (str: string): string {

    const apiPath = str.replace(RegExp('^\/api\/users'), '');

    if (apiPath == '' || apiPath == str)
        return str;
            
    if ((apiPath.match(/\//g) || []).length > 1)
        return str;
    else 
        return "/api/users/:id";
    
}

function getArgFromUrl (str: string): string {

    return String(str.split("/").pop());
    
}