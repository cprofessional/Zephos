import { LLM } from "./llm";

export default class GeminiWrapper extends LLM {
    
    public getDefaultModels(): { languageModel: string; imageModel: string; model: string; } {
        return { languageModel: "gemini", imageModel: "gemini", model: "gemini-2.0-flash" };
    }

    public async newCompletion(ctx: string, p: string, model: string, imgctx: string | undefined): Promise<string> {
        try {
            const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${this.apiKey}`, {
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

    public async newFileCompletion(f: File): Promise<string> { 
        return "The user uploaded a file named "+f.name;
        try {
            let numBytes = f.size;
            let mimeType = f.type;
            const res = await fetch(`https://generativelanguage.googleapis.com/upload/v1beta/files?key=${this.apiKey}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Goog-Upload-Protocol": "resumable",
                    "X-Goog-Upload-Command": "start", 
                    "X-Goog-Upload-Header-Content-Length": String(numBytes),
                    "X-Goog-Upload-Header-Content-Type": mimeType
                },
                body: JSON.stringify({
                    file: {
                        display_name: f.name
                    }
                }),
            });
        } catch (err) {
            console.log("There was an error: " + err);
            return "There was an issue connecting to Google Gemini";
        }
    }
}