
import React, { useState, useCallback } from 'react';
import { generatePromptForChatGpt } from './services/geminiService';
import Header from './components/Header';
import RequestDisplay from './components/RequestDisplay';
import ResultDisplay from './components/ResultDisplay';

const App: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleGeneratePrompt = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setGeneratedPrompt(null);
        try {
            const prompt = await generatePromptForChatGpt();
            setGeneratedPrompt(prompt);
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
            setError(`Failed to generate prompt: ${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col font-sans">
            <Header />
            <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
                    <div className="flex flex-col gap-4">
                        <RequestDisplay />
                        <button
                            onClick={handleGeneratePrompt}
                            disabled={isLoading}
                            className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Generando...
                                </>
                            ) : (
                                '✨ Volver a Generar Prompt ✨'
                            )}
                        </button>
                    </div>
                    <div>
                        <ResultDisplay isLoading={isLoading} error={error} prompt={generatedPrompt} />
                    </div>
                </div>
            </main>
             <footer className="text-center p-4 text-gray-500 text-sm border-t border-gray-800">
                Creado con React, Tailwind CSS y la API de Gemini.
            </footer>
        </div>
    );
};

export default App;
