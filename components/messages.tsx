import React from 'react';
import { Images } from "lucide-react";

interface Message {
    sender: string;
    message: string;
    files?: File[];
}

interface MessagesProps {
    pastMessages: Message[];
}

const Messages: React.FC<MessagesProps> = ({ pastMessages }) => {
    return (
        <div
            className="Messages"
            style={{
                position: "fixed",
                top: "40px",
                width: "100%",
                padding: "0 40px",
                maxHeight: "80vh",
                overflowY: "auto",
            }}
        >
            {pastMessages.map((msg, index) => (
                <div
                    key={index}
                    className={`p-4 rounded-lg ${
                        msg.sender === "User" ? "bg-[#3A3B3A] ml-auto" : "bg-[#2b2d31] mr-auto"
                    }`}
                    style={{
                        maxWidth: "92%",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "normal",
                        fontSize: "13px",
                    }}
                >
                    <p>{msg.message}</p>
                    {msg.files && msg.files.length > 0 && (
                        <div className="w-full flex flex-wrap gap-2 mt-2">
                            {msg.files.map((file, fileIndex) => (
                                <div key={fileIndex} className="flex items-center space-x-2 bg-[#40414F] p-1 rounded">
                                    <Images className="h-5 w-5" />
                                    <span className="text-sm">{file.name}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Messages;