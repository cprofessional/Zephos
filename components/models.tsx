import LLMManager from '@/lib/llm_manager';
import React from 'react';

interface ModelsProps {
    visualModel: string;
    setVisualModel: (value: string) => void;
    models: { languageModel: string; imageModel: string; model: string; };
    setModels: (value: { languageModel: string; imageModel: string; model: string; }) => void;
}

const Models: React.FC<ModelsProps> = ({
    visualModel,
    setVisualModel,
    setModels
}) => {
    const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedModel = event.target.value;
    
        switch(selectedModel.toLowerCase()) {
          case "openai": setModels(LLMManager.getOpenAIAPI().getDefaultModels()); break;
          case "deepseek": setModels(LLMManager.getDeepSeekAPI().getDefaultModels()); break;
          case "gemini": setModels(LLMManager.getGemeniAPI().getDefaultModels()); break;
          case "copilot": setModels(LLMManager.getCoPioletAPI().getDefaultModels()); break;
        }
    
        setVisualModel(selectedModel);
      };

    return (
        <div className="absolute top-4 left-4 ">
          <select
            value={visualModel}
            onChange={handleModelChange}
            className="bg-[#2A2B2A] rounded-lg text-white"
          >
            <option value="openai">OpenAI</option>
            <option value="gemini">Gemini</option>
            <option value="deepseek">DeepSeek</option>
            <option value="copilot">Copilot</option>
          </select>
        </div>
    );
};

export default Models;