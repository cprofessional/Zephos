import { MoreHorizontal, Plus, Search, Mic, Send } from "lucide-react";
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
    inputValue: string;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSend: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ inputValue, onInputChange, onSend }) => {
    return (
        <div className="relative flex items-center bg-[#2A2B2A] rounded-lg">
            <Button variant="ghost" className="absolute left-2">
                <Plus className="h-5 w-5" />
            </Button>

            <Input
                onChange={onInputChange}
                value={inputValue}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') onSend();
                }}
            />
            <div className="absolute right-2 flex items-center space-x-2">
                {inputValue ? (
                    <Button variant="ghost" size="icon" onClick={onSend}>
                        <Send className="h-5 w-5" />
                    </Button>
                ) : (
                    <>
                        <Button variant="ghost" size="icon">
                            <Search className="h-5 w-5" />
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
    );
};

export default SearchBar;