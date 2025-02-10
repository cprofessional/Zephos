import { MoreHorizontal, Plus, Images, Mic, Send, X } from "lucide-react";
import React, { useRef, useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
    inputValue: string;
    uploadedFiles: File[];
    setUploadedFiles: (files: File[]) => void;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSend: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ inputValue, uploadedFiles, setUploadedFiles, onInputChange, onSend}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const onAdd = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

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

    return (
        <div className="relative flex flex-col items-center bg-[#2A2B2A] rounded-lg p-2 space-y-4">
            {uploadedFiles.length > 0 && (
                <div className="w-full flex flex-wrap gap-2">
                    {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center space-x-2 bg-[#40414F] p-1 rounded">
                            <Images className="h-5 w-5" />
                            <span className="text-sm">{file.name}</span>
                            <Button variant="ghost" size="icon" onClick={() => handleRemoveFile(index)}>
                                <X className="h-5 w-5" />
                            </Button>
                        </div>
                    ))}
                </div>
            )}
            <div className="relative flex items-center w-full bg-[#2A2B2A] rounded-lg">
                <Button variant="ghost" className="absolute left-0" onClick={onAdd}>
                    <Plus className="h-5 w-5" />
                </Button>
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                />
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
                            <Button variant="ghost" size="icon" >
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