
import React, { useState } from 'react';
import Loader from './Loader';

interface ResultDisplayProps {
    isLoading: boolean;
    error: string | null;
    prompt: string | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ isLoading, error, prompt }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (prompt) {
            navigator.clipboard.writeText(prompt);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const renderContent = () => {
        if (isLoading) {
            return <Loader />;
        }
        if (error) {
            return (
                <div className="text-center text-red-400 bg-red-900/30 p-4 rounded-lg">
                    <h3 className="font-bold mb-2">Error</h3>
                    <p>{error}</p>
                </div>
            );
        }
        if (prompt) {
            return (
                <div className="relative">
                    <button 
                        onClick={handleCopy}
                        className="absolute top-2 right-2 bg-gray-600 hover:bg-indigo-500 text-white font-bold py-1 px-3 rounded-md text-xs transition-all duration-200"
                    >
                        {copied ? '¡Copiado!' : 'Copiar'}
                    </button>
                    <pre className="whitespace-pre-wrap break-words font-sans text-gray-200 p-4 bg-gray-900/60 rounded-lg border border-gray-700">
                        {prompt}
                    </pre>
                </div>
            );
        }
        return <p className="text-gray-500 text-center">Presiona "Generar Prompt" para empezar.</p>;
    };

    return (
        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 h-full flex flex-col">
            <h2 className="text-lg font-semibold text-indigo-400 mb-4">Prompt Generado para ChatGPT</h2>
            <div className="bg-gray-900 rounded-lg p-4 flex-grow flex items-center justify-center overflow-y-auto">
                {renderContent()}
            </div>
        </div>
    );
};

export default ResultDisplay;
