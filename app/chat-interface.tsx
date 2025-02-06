"use client";
import { MoreHorizontal, Plus, Search, Mic, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import askPrompt from "./openai";

export default function ChatInterface() {
  const [inputValue, setInputValue] = useState("");
  const [startMode, setStartMode] = useState(false);
  const [pastMessages, setPastMessages] = useState<
    { sender: string; message: string }[]
  >([]);

  const handleInputChange = (event: { target: { value: any } }) => {
    if (event.target.value == "") setInputValue("");
    else setInputValue(event.target.value);
  };

  const handleSendButton = () => {
    setInputValue("");

    if (!startMode) setStartMode(true);
    setPastMessages((prevMessages) => [
        ...prevMessages,
        { sender: "User", message: inputValue },
    ]);
    
    handleAsyncQuery()
  }
  const handleAsyncQuery = async () => {
    try {
        const botMessage = await askPrompt(pastMessages);
        setPastMessages((prevMessages) => [
            ...prevMessages,
            { sender: "Bot", message: botMessage },
        ]);

    } catch (error) {
        console.error("Error fetching bot response:", error);
        setPastMessages((prevMessages) => [
            ...prevMessages,
            { sender: "Bot", message: "Sorry, something went wrong." },
        ]);
    }
  };

  return (
    <div
      className={`min-h-screen bg-[#1E1F1E] text-white flex items-center justify-center p-4`}
    >
      <div
        className=""
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
            className={`bg-[#3A3B3A] p-4 rounded-lg ${
              msg.sender === "User" ? "bg-[#2a2b2a] ml-auto" : "mr-auto"
            }`}
            style={{
              maxWidth: "92%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "normal",
            }}
          >
            {msg.message}
          </div>
        ))}
      </div>

      <div
        className={`w-full max-w-3xl space-y-6 ${
          !startMode ? `` : `absolute bottom-10`
        }`}
      >
        {!startMode && (
          <h1 className="text-4xl font-semibold text-center">
            What can I help with?
          </h1>
        )}

        <div className="relative flex items-center bg-[#2A2B2A] rounded-lg">
          <Button variant="ghost" className="absolute left-2">
            <Plus className="h-5 w-5" />
          </Button>

          <Input
            onChange={handleInputChange}
            value={inputValue}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendButton();
            }}
          />
          <div className="absolute right-2 flex items-center space-x-2">
            {inputValue ? (
              <Button variant="ghost" size="icon" onClick={handleSendButton}>
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
      </div>
    </div>
  );
}
