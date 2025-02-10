import { ChangeEvent } from "react";
import { handleRequest } from "./request-handler";

export const handleInputChange = (event: ChangeEvent<HTMLInputElement>, setInputValue: (value: string) => void) => {
    if(event.target.value == "") setInputValue("");
    else setInputValue(event.target.value);
};

export const handleSend = async (
    inputValue: string,
    uploadedFiles: File[],
    setInputValue: (value: string) => void,
    setStartMode: (value: boolean) => void,
    setPastMessages: (callback: (prevMessages: { sender: string; message: string; files?: File[] }[]) => { sender: string; message: string; files?: File[] }[]) => void,
    pastMessages: { sender: string; message: string; files?: File[] }[],
    models: { languageModel: string; imageModel: string; model: string }
) => {
    if(inputValue === "") return;
    setInputValue("");
    setStartMode(true);

    setPastMessages((prevMessages) => [
        ...prevMessages,
        { sender: "User", message: inputValue, files: uploadedFiles },
    ]);

    const ctx = pastMessages.map(({ sender, message }) => `${sender}: ${message}`).join("\n");
    const resp = await handleRequest(inputValue, ctx, uploadedFiles, models)

    setPastMessages((prevMessages) => [
        ...prevMessages,
        { sender: "Bot", message: resp, files: uploadedFiles },
    ]);
};