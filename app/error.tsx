"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
interface ErrorProps {
  error: Error;
  reset: () => void;}

const ErrorPage = ({ error, reset }: ErrorProps) => {
  const router = useRouter();
  useEffect(() => {
    console.error("Error occurred:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-3">
      <h1 className="text-xl font-bold items-center  text-red-600">Oops! Something went wrong.</h1>
      <p className="mt-2 items-center text-[13px] text-gray-700">We encountered an unexpected error. Please try again.</p>
      <div className="mt-4 flex space-x-4">
        <button
          onClick={() => reset()} 
          className="rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
        >
          Retry
        </button>
        <button
          onClick={() => router.push("/")}
          className="rounded-lg bg-gray-600 px-4 py-2 text-white transition hover:bg-gray-700"
        >
          Home
        </button>
      </div>
    </div>
  );
}

export default  ErrorPage;