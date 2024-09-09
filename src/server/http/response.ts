interface Response<T> {
  statusCode: number;
  status: "success" | "error";
  message?: string;
  data?: T;
}

export default class CustomResponse<T> {
  public statusCode: number;
  public status: "success" | "error";
  public message?: string;
  public data?: T;

  constructor({ statusCode, status, message, data }: Response<T>) {
    this.status = status;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }

  public toObj() {
    return {
      statusCode: this.statusCode,
      status: this.status,
      message: this.message,
      data: this.data,
    };
  }
}
