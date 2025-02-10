import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface FileInputProps {
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInput: React.FC<FileInputProps> = ({ onFileChange }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const onAdd = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <>
            <Button variant="ghost" className="absolute left-0" onClick={onAdd}>
                <Plus className="h-5 w-5" />
            </Button>
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={onFileChange}
            />
        </>
    );
};

export default FileInput;