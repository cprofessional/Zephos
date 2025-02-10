import CoPioletWrapper from "./llm/copilot";
import OpenAIWrapper from "./llm/openai";
import DeepseekWrapper from "./llm/deepseek";
import GeminiWrapper from "./llm/gemini";

export default class LLMManager {
    private static copioletApi = new CoPioletWrapper(process.env.NEXT_PUBLIC_COPIOLET_KEY);
    private static openaiApi = new OpenAIWrapper(process.env.NEXT_PUBLIC_OPENAI_KEY);
    private static deepseekApi = new DeepseekWrapper(process.env.NEXT_PUBLIC_DEEPSEEK_KEY);
    private static gemeniApi = new GeminiWrapper(process.env.NEXT_PUBLIC_GEMINI_KEY);

    public static getCoPioletAPI() {
        return this.copioletApi;
    }

    public static getOpenAIAPI() {
        return this.openaiApi;
    }

    public static getDeepSeekAPI() {
        return this.deepseekApi;
    }

    public static getGemeniAPI() {
        return this.gemeniApi;
    }
    
    public static getDefaultModels() {
        return this.getOpenAIAPI().getDefaultModels();
    }
}