import { MoreHorizontal, Images, Mic, Send } from "lucide-react";
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FilePreview from './file/preview';
import FileInput from './file/input';

interface SearchBarProps {
    inputValue: string;
    uploadedFiles: File[];
    setUploadedFiles: (files: File[]) => void;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSend: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ inputValue, uploadedFiles, setUploadedFiles, onInputChange, onSend }) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const newFiles = Array.from(files);
            setUploadedFiles([...uploadedFiles, ...newFiles]);
        }
    };

    const handleRemoveFile = (index: number) => {
        const updatedFiles = uploadedFiles.filter((_, i) => i !== index);
        setUploadedFiles(updatedFiles);
    };

    const handleSendClick = () => {
        onSend();
        setUploadedFiles([]);
    };

    const handlePaste = (e: ClipboardEvent) => {
        const items = e.clipboardData?.items;
        if (items) {
            Array.from(items).forEach((item) => {
                const file = item.getAsFile();
                if (file) setUploadedFiles([...uploadedFiles, file]);
            });
        }
    };

    useEffect(() => {
        document.addEventListener("paste", handlePaste);
        return () => {
            document.removeEventListener("paste", handlePaste);
        };
    }, [uploadedFiles]);

    return (
        <div className="relative flex flex-col items-center bg-[#2A2B2A] rounded-lg p-2 space-y-4">
            {uploadedFiles.length > 0 && (
                <div className="w-full flex flex-wrap gap-2">
                    {uploadedFiles.map((file, index) => (
                        <FilePreview key={index} file={file} onRemove={() => handleRemoveFile(index)} />
                    ))}
                </div>
            )}
            <div className="relative flex items-center w-full bg-[#2A2B2A] rounded-lg">
                <FileInput onFileChange={handleFileChange} />
                <Input
                    onChange={onInputChange}
                    value={inputValue}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSendClick();
                    }}
                />
                <div className="absolute right-2 flex items-center space-x-2">
                    {inputValue || uploadedFiles.length > 0 ? (
                        <Button variant="ghost" size="icon" onClick={handleSendClick}>
                            <Send className="h-5 w-4" />
                        </Button>
                    ) : (
                        <>
                            <Button variant="ghost" size="icon">
                                <Images className="h-5 w-5" />
                            </Button>
                            <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-5 w-5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="bg-[#40414F]">
                                <Mic className="h-5 w-5" />
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchBar;