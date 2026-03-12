export default function Spinner() {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div role="status" aria-label="Loading" className="inline-block">
        <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
