type Status = 'error' | 'warning'

export class BaseException extends Error {
    message: string;
    status: Status;
    statusCode?: number;
    private timestamp: Date;
    private privateDescription: string;
    constructor(message: string, status: Status, privateDescription: any) {
        super();
        this.message = message;
        this.status = status;
        this.timestamp = new Date();
        this.privateDescription = privateDescription;

        Error.captureStackTrace(this, this.constructor)
    }
}