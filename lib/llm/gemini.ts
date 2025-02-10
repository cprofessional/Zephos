import { LLM } from "./llm";

export default class GeminiWrapper extends LLM {
    
    public getDefaultModels(): { languageModel: string; imageModel: string; model: string; } {
        return { languageModel: "gemini", imageModel: "gemini-2.0-flash", model: "emini-2.0-flash" };
    }

    public async newCompletion(ctx: string, p: string, model: string, imgctx: string | undefined): Promise<string> {
        try {
            const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + "AIzaSyAvBt4hcVpfwIzp_EBjIxMsCOn8KPPE5R4", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: imgctx ? this.getImageContext(p, ctx, imgctx) : this.getDefaultContent(p, ctx)
                        }],
                    }],
                }),
            });

            const json = await res.json();
            return json.candidates[0].content.parts[0].text
        } catch (err) {
            console.log("There was an error: " + err);
            return "There was an issue connecting to Google Gemini";
        }
    }

    public async newFileCompletion(files: File[]): Promise<string> { 
        return `user uploaded a file named ${files[0].name}`
    }
}