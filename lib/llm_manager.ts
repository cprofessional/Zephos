import CoPioletWrapper from "./llm/copilot";
import OpenAIWrapper from "./llm/openai";
import DeepseekWrapper from "./llm/deepseek";
import GeminiWrapper from "./llm/gemini";

export default class LLMManager {
    private static copioletApi = new CoPioletWrapper();
    private static openaiApi = new OpenAIWrapper();
    private static deepseekApi = new DeepseekWrapper()
    private static gemeniApi = new GeminiWrapper();

    public static getCoPioletAPI() {
        return this.copioletApi;
    }

    public static getOpenAIAPI() {
        return this.openaiApi;
    }

    public static getDeepSeekAPI() {
        return this.deepseekApi
    }

    public static getGemeniAPI() {
        return this.gemeniApi;
    }
}