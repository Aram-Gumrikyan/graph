import ServerError from "./ServerError";

class DataError extends ServerError {
  public name = "DataError";
  protected status = 400;
}

export default DataError;
