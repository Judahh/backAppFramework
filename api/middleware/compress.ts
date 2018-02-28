import { RequestHandler, Router, Request, Response, NextFunction } from 'express';

let compress: RequestHandler = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    request.url = request.url + '.gz';
    response.set('Content-Encoding', 'gzip');
    next();
}

export = compress;
