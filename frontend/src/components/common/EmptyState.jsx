export function EmptyState({ message = 'No content available yet.' }) {
  return <p className="empty-state">{message}</p>
}
