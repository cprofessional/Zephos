import { LLM } from "./llm";

export default class DeepseekWrapper extends LLM {

    public getDefaultModels(): { languageModel: string; imageModel: string; model: string; } {
        return { languageModel: "deepseek", imageModel: "gemini", model: "deepseek-chat" };
    }

    public async newCompletion(ctx: string, p: string, model: string, imgctx: string | undefined): Promise<string> {
        try {
            const res = await fetch("https://api.deepseek.com/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.apiKey}`,
                },
                body: JSON.stringify({
                    model: model,
                    stream: true,
                    messages: [
                        {
                            role: "system",
                            content: imgctx ? this.getImageContext(p, ctx, imgctx) : this.getDefaultContent(p, ctx)
                        },
                    ],
                }),
            });

            const json = await res.json();
            console.log(json)
            return json.choices[0].message.content;
        } catch (err) {
            console.log("There was an error: " + err);
            return "There was an issue connecting to DeepSeek AI";
        }
    }
}