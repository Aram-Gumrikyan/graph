abstract class ServerError implements Error {
  public abstract name: string;
  protected abstract status: number;

  constructor(public message: string) {}

  public static check(obj: Error): obj is ServerError {
    return obj instanceof ServerError;
  }

  public static message(status: number) {
    const messages: { [key: number]: string } = {
      500: "Internal Server Error",
      400: "Bad Request",
    };

    return messages[status];
  }

  public getStatus() {
    return this.status;
  }
}

export default ServerError;
