import React from 'react';

interface Message {
    sender: string;
    message: string;
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
                    {msg.message}
                </div>
            ))}
        </div>
    );
};

export default Messages;