export default async function askPrompt(ctx: string, p: string): Promise<string> {
    try {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content: "THESE ARE OUR PAST MESSAGES: "+ctx+" THIS IS THE NEWEST PROMPT: "+p,
                    },
                ],
            }),
        });
    
        const json = await res.json();
        return json.choices[0].message.content;
    } catch (err) {
        console.log("There was an error: "+err);
        return "There was an issue connecting to OpenAI"
    }
}
