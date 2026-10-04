export default function Header() {
  return (
    <header className="navbar relative left-1/2 -mt-4 mb-8 min-h-0 w-screen -translate-x-1/2 bg-[#D98308] px-6 py-8 text-white shadow-md sm:-mt-6 sm:px-8">
      <div className="flex-1">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Crop Classifier
        </h1>
      </div>
      <button
        type="button"
        aria-label="Open navigation menu"
        className="btn btn-ghost btn-square flex flex-col gap-2 hover:bg-transparent hover:border-0 hover:shadow-none focus:outline-none focus:border-0"
      >
        <span className="h-0.5 w-full rounded bg-white" />
        <span className="h-0.5 w-full rounded bg-white" />
        <span className="h-0.5 w-full rounded bg-white" />
      </button>
    </header>
  )
}
