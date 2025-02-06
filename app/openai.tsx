export default async function askPrompt(context: { sender: string; message: string }[]): Promise<string> {

    console.log(context)
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
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
                    content: context,
                },
            ],
        }),
    });

    const json = await response.json();
    return json.choices[0].message.content;
}