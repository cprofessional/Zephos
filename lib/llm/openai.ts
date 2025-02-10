import { LLM } from "./llm";

export default class OpenAIWrapper extends LLM {

    public getDefaultModels(): { languageModel: string; imageModel: string; model: string; } {
        return { languageModel: "openai", imageModel: "gemini-2.0-flash", model: "gpt-4o-mini" };
    }

    public async newCompletion(ctx: string, p: string, model: string, imgctx: string | undefined): Promise<string> {
        console.log(p);
        try {
            const res = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.apiKey}`,
                },
                body: JSON.stringify({
                    model: model,
                    messages: [
                        {
                            role: "system",
                            content: imgctx ? this.getImageContext(p, ctx, imgctx) : this.getDefaultContent(p, ctx)
                        },
                    ],
                }),
            });

            const json = await res.json();
            return json.choices[0].message.content;
        } catch (err) {
            console.log("There was an error: " + err);
            return "There was an issue connecting to OpenAI";
        }
    }
}