import type { ErrorMessageProps } from "../interfaces/componentTypes";

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <div className="text-center mt-10 text-red-600 font-semibold">
    {message}
  </div>
);

export default ErrorMessage;
