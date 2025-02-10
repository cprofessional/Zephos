export default class GeminiWrapper {
    private apiKey = process.env.NEXT_PUBLIC_GEMINI_KEY

    public async newCompletion(ctx: string, p: string): Promise<string> {
        try {
            const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${this.apiKey}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contents: [{
                        "parts":[{"text": "Explain how AI works"}]
                    }]
                }),
            });

            const json = await res.json();
            console.log(json)
            return json.choices[0].message.content;
        } catch (err) {
            console.log("There was an error: " + err);
            return "There was an issue connecting to OpenAI";
        }
    }
}