import { LLM } from "./llm";

export default class DeepseekWrapper extends LLM {

    public getDefaultModels(): { languageModel: string; imageModel: string; model: string; } {
        return { languageModel: "deepseek", imageModel: "gemini", model: "edeepseek-chat" };
    }

    public async newCompletion(ctx: string, p: string, model: string, imgctx: string | undefined): Promise<string> {
        return "NOOP"
    }
}