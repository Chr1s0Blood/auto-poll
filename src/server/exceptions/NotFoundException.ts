import { BaseException } from "./BaseException.js";

export class NotFoundException extends BaseException {
    constructor(message: string, privateDescription?: any) {
        super(message, 'error', privateDescription);
        this.statusCode = 404;
    }
}