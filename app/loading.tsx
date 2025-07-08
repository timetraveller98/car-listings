const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-transparent border-t-blue-500 border-b-blue-500 rounded-full animate-spin"></div>
        <div className="absolute w-10 h-10 border-4 border-transparent border-t-blue-400 border-b-blue-400 rounded-full animate-ping"></div>
      </div>
    </div>
  );
};
export default Loading;
