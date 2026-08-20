export function ErrorMessage({ message = 'Something went wrong.' }) {
  return <p className="error-message">{message}</p>
}
