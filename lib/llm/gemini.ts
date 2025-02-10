import { LLM } from "./llm";

export default class GeminiWrapper extends LLM {
    
    public getDefaultModels(): { languageModel: string; imageModel: string; model: string; } {
        return { languageModel: "gemini", imageModel: "gemini-2.0-flash", model: "emini-2.0-flash" };
    }

    public async newCompletion(ctx: string, p: string, model: string, imgctx: string | undefined): Promise<string> {
        return "NOOP";
    }

    public async newFileCompletion(files: File[]): Promise<string> { 
        return `user uploaded a file named ${files[0].name}`
    }
}