import { createServer, IncomingMessage, ServerResponse } from 'http';
import { appRouter } from './routes/router';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();
 
const PORT = process.env.PORT || 5000;
 
const server = createServer((req: IncomingMessage, res: ServerResponse) => {

    appRouter(req, res);

}).listen(PORT);