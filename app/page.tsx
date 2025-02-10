"use client";
import { useState } from "react";
import SearchBar from "@/components/search-bar";
import Messages from "@/components/messages";
import FileDropZone from "@/components/file/drop";
import { handleInputChange, handleSend } from "../lib/chat-handler";
import LLMManager from "@/lib/llm_manager";
import Models from "@/components/models";
new LLMManager();

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [startMode, setStartMode] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [visualModel, setVisualModel] = useState("OpenAI");
  const [models, setModels] = useState<{ languageModel: string; imageModel: string; model: string; }>(LLMManager.getDefaultModels());
  const [pastMessages, setPastMessages] = useState<
    { sender: string; message: string; files?: File[] }[]
  >([]);

  const send = () => {
    handleSend(inputValue, uploadedFiles, setInputValue, setStartMode, setPastMessages, pastMessages, models);
  };

  return (
    <FileDropZone uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles}>
      <div className="bg-[#1E1F1E] text-white flex items-center justify-center min-h-screen">
        <Models 
          visualModel={visualModel} 
          setVisualModel={setVisualModel} 
          models={models} 
          setModels={setModels} 
        />
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
            onSend={send} 
          />
        </div>
      </div>
    </FileDropZone>
  );
}