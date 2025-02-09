import OpenAIWrapper from "./openai";

export const handleInputChange = (event: { target: { value: any } }, setInputValue: (value: string) => void) => {
    if(event.target.value == "") setInputValue("");
    else setInputValue(event.target.value);
};

export const handleSendButton = async (
    inputValue: string,
    setInputValue: (value: string) => void,
    setStartMode: (value: boolean) => void,
    setPastMessages: (callback: (prevMessages: { sender: string;message: string } []) => { sender: string;message: string } []) => void,
    openAi: OpenAIWrapper,
    pastMessages: { sender: string;message: string } []
) => {
    if(inputValue === "") return;
    setInputValue("");

    if(typeof setStartMode === 'function') setStartMode(true);
    setPastMessages((prevMessages) => [
    ...prevMessages,
        { sender: "User", message: inputValue },
  ]);

    const ctx = pastMessages.map(({ sender, message }) => `${sender}: ${message}`).join("\n");
    const botMessage = await openAi.newCompletion(ctx, inputValue);
    setPastMessages((prevMessages) => [
    ...prevMessages,
        { sender: "Bot", message: botMessage },
  ]);
};