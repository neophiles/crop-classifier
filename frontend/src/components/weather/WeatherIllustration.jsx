export default function WeatherIllustration() {
  return (
    <div className="flex h-20 w-20 items-center justify-center" aria-label="Weather illustration">
      <svg viewBox="0 0 96 72" role="img" aria-hidden="true" className="h-full w-full">
        <circle cx="65" cy="24" r="16" fill="#FFD447" />
        <g stroke="#F3B51B" strokeLinecap="round" strokeWidth="3">
          <path d="M65 2v7M65 39v7M43 24h7M80 24h7M49 8l5 5M76 35l5 5M81 8l-5 5" />
        </g>
        <path
          d="M25 54c-9 0-16-6-16-14s7-14 16-14c2-10 11-17 22-17 12 0 21 8 23 19 8 0 15 6 15 14s-7 12-16 12H25Z"
          fill="#B9E2F8"
        />
        <g stroke="#198CE3" strokeLinecap="round" strokeWidth="3">
          <path d="m28 59-4 7M47 59l-4 7M66 59l-4 7" />
        </g>
      </svg>
    </div>
  )
}
