export default function Header({ backendStatus }) {
  const statusBadgeClass = {
    online: 'badge-success',
    offline: 'badge-error',
    checking: 'badge-warning',
  }[backendStatus] || 'badge-ghost'

  return (
    <header className="navbar mb-4 min-h-0 border-b border-base-300 px-0 pb-3">
      <div className="flex-1">
        <h1 className="text-xl font-bold">Crop Classifier & Optimizer</h1>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <span>Backend:</span>
        <span className={`badge ${statusBadgeClass}`}>
          {backendStatus.toUpperCase()}
        </span>
      </div>
    </header>
  )
}
