import React from 'react';
import { Button } from "@/components/ui/button";
import { Images, X } from "lucide-react";

interface FilePreviewProps {
    file: File;
    onRemove: () => void;
}

const FilePreview: React.FC<FilePreviewProps> = ({ file, onRemove }) => {
    return (
        <div className="flex items-center space-x-2 bg-[#40414F] p-1 rounded">
            <Images className="h-5 w-5" />
            <span className="text-sm">{file.name}</span>
            <Button variant="ghost" size="icon" onClick={onRemove}>
                <X className="h-5 w-5" />
            </Button>
        </div>
    );
};

export default FilePreview;