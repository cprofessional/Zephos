import { LLM } from "./llm";

export default class CoPioletWrapper extends LLM {

    public getDefaultModels(): { languageModel: string; imageModel: string; model: string; } {
        return { languageModel: "copiolet", imageModel: "gemini-2.0-flash", model: "gpt-4o" };
    }

    public async newCompletion(ctx: string, p: string, model: string, imgctx: string | undefined): Promise<string> {
        return "NOOP"
    }
}