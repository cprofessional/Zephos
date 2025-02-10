import { ChangeEvent } from "react";
import OpenAIWrapper from "./openai";

export const handleInputChange = (event: ChangeEvent<HTMLInputElement>, setInputValue: (value: string) => void) => {
    if(event.target.value == "") setInputValue("");
    else setInputValue(event.target.value);
};

const toBase64 = (file: File) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});

export const handleSendButton = async (
    inputValue: string,
    uploadedFiles: File[],
    setInputValue: (value: string) => void,
    setStartMode: (value: boolean) => void,
    setPastMessages: (callback: (prevMessages: { sender: string; message: string; files?: File[] }[]) => { sender: string; message: string; files?: File[] }[]) => void,
    openAi: OpenAIWrapper,
    pastMessages: { sender: string; message: string; files?: File[] }[],
) => {

    if(inputValue === "") return;
    setInputValue("");
    if(typeof setStartMode === 'function') setStartMode(true);
    setPastMessages((prevMessages) => [
        ...prevMessages,
        { sender: "User", message: inputValue, files: uploadedFiles },
    ]);

    const ctx = pastMessages.map(({ sender, message }) => `${sender}: ${message}`).join("\n");

    let botMessage = "";
    botMessage = await openAi.newCompletion(ctx, inputValue);
    setPastMessages((prevMessages) => [
        ...prevMessages,
        { sender: "Bot", message: botMessage },
    ]);
};