export const FolderSkeleton = ({ level = 0 }) => {
    return (
      <div className="px-2 py-1.5 mt-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm bg-gray-600/30 animate-pulse"></div>
          <div className="w-full h-7 rounded-sm bg-gray-600/30 animate-pulse"></div>
        </div>
      </div>
    );
  };