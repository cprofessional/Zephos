"use client";
import { useState } from "react";
import OpenAIWrapper from "../lib/openai";
import SearchBar from "@/components/search-bar";
import Messages from "@/components/messages";
import FileDropZone from "@/components/file-drop";
import { handleInputChange, handleSendButton } from "../lib/chat-handler";

const ai = new OpenAIWrapper();

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [startMode, setStartMode] = useState(false);
  const [pastMessages, setPastMessages] = useState<
    { sender: string; message: string }[]
  >([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleSend = () => {
    handleSendButton(inputValue, uploadedFiles, setInputValue, setStartMode, setPastMessages, ai, pastMessages);
  };

  return (
    <FileDropZone uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles}>
      <div className="bg-[#1E1F1E] text-white flex items-center justify-center min-h-screen">
        {startMode && <Messages pastMessages={pastMessages} />}
        <div className={`w-full max-w-3xl space-y-6 ${!startMode ? `` : `absolute bottom-10`}`}>
          {!startMode && (
            <h1 className="text-4xl font-semibold text-center">
              What can I help with?
            </h1>
          )}
          <SearchBar 
            inputValue={inputValue} 
            uploadedFiles={uploadedFiles}
            setUploadedFiles={setUploadedFiles}
            onInputChange={(e) => handleInputChange(e, setInputValue)} 
            onSend={handleSend} 
          />
        </div>
      </div>
    </FileDropZone>
  );
}
