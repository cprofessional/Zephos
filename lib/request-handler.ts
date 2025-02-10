import LLMManager from "./llm_manager";

const handleRequest = async (prompt: string, ctx: string, uploadedFiles: File[], opts: {languageModel: string, model: string, imageModel: string} ): Promise<string> => {
    var imgctx: string | undefined;
    if(uploadedFiles.length > 0) {
        imgctx = await handleFiles(uploadedFiles, opts);
    }
    
    switch(opts.languageModel) {
        case "openai": 
            return LLMManager.getOpenAIAPI().newCompletion(ctx, prompt, opts.model, imgctx);
        case "gemini": 
            return LLMManager.getGemeniAPI().newCompletion(ctx, prompt, opts.model, imgctx);
        case "deepseek": 
            return LLMManager.getDeepSeekAPI().newCompletion(ctx, prompt, opts.model, imgctx);
        default:
            console.error("handleRequest error, invalid languageModel.");
            return "handleRequest error, invalid languageModel.";
    }
}

const handleFiles = async (uploadedFiles: File[], opts: { languageModel: string; imageModel: string, model: string }): Promise<string> => {
    switch(opts.imageModel) {
        case "gemini": 
            let d = LLMManager.getGemeniAPI().newFileCompletion(uploadedFiles[0]);
            console.log(d)
            return d
        default:
            console.error("handleRequest error, invalid imageModel.");
            return "handleRequest error, invalid imageModel.";
    }
}

export { handleRequest }