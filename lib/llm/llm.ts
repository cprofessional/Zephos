export abstract class LLM {
    public apiKey: string | undefined;

    public constructor(k: string | undefined) {
        this.apiKey = k
    }

    public applyDefaultModels(models: {languageModel: string, imageModel: string, model: string}): {languageModel: string, imageModel: string, model: string} {
        return this.getDefaultModels();
    }

    abstract getDefaultModels(): {languageModel: string, imageModel: string, model: string}

    public getDefaultContent(p: string, ctx: string): string {
        return "THESE ARE OUR PAST MESSAGES: " + ctx + " THIS IS THE NEWEST PROMPT: " + p;
    }

    public getImageContext(p: string, ctx: string, imgctx: string) {
        return this.getDefaultContent(p, ctx) + " " + imgctx;
    }
    
    abstract newCompletion(ctx: string, p: string, model: string, imgctx: string | undefined): Promise<string> 
}