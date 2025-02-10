import React, { useState, useCallback, ReactNode } from "react";

interface FileDropZoneProps {
  setUploadedFiles: (files: File[]) => void;
  uploadedFiles: File[];
  children: ReactNode;
}

const FileDropZone: React.FC<FileDropZoneProps> = ({ setUploadedFiles, uploadedFiles, children }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [dragEnterCounter, setDragEnterCounter] = useState(0);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    setUploadedFiles([...uploadedFiles, ...files]);
    setIsDragOver(false);
    setDragEnterCounter(0);
  }, [setUploadedFiles, uploadedFiles]);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDragEnter = () => {
    setDragEnterCounter((prevCount) => prevCount + 1);
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setDragEnterCounter((prevCount) => {
      const newCount = prevCount - 1;
      if (newCount <= 0) {
        setIsDragOver(false);
      }
      return newCount;
    });
  };

  return (
    <div
      className="relative"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      {isDragOver && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="text-2xl text-white font-semibold">Drop files here</div>
        </div>
      )}
      {children}
    </div>
  );
};

export default FileDropZone;