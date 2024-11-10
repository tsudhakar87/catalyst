"use client";

export default function Home() {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => {
          fetch("/parse");
        }}
        className="px-2 py-1 bg-gray-600 rounded-md"
      >
        /parse
      </button>
      <button
        onClick={() => {
          fetch("/catalog");
        }}
        className="px-2 py-1 bg-gray-600 rounded-md"
      >
        /catalog
      </button>
      <button
        onClick={() => {
          fetch("/schedule");
        }}
        className="px-2 py-1 bg-gray-600 rounded-md"
      >
        /schedule
      </button>
    </div>
  );
}
