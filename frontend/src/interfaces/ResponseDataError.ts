interface DataError {
  code: string;
  message: string;
}

interface DataErrorResponse {
  data: DataError;
  status: number;
}

interface IAxiosError {
  response: DataErrorResponse;
}

export default IAxiosError;