export default function Header({ backendStatus }) {
  return (
    <header style={{ marginBottom: '14px', borderBottom: '1px solid #ccc', paddingBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h2 style={{ margin: 0, fontSize: '18px' }}>Crop Classifier & Optimizer</h2>
      <span style={{ fontSize: '13px' }}>
        Backend:{' '}
        <strong style={{ color: backendStatus === 'online' ? 'green' : backendStatus === 'offline' ? 'red' : 'gray' }}>
          {backendStatus.toUpperCase()}
        </strong>
      </span>
    </header>
  )
}
