
import { GoogleGenAI } from "@google/genai";
import { USER_REQUEST, ASSIGNMENT_DETAILS } from '../constants';

export const generatePromptForChatGpt = async (): Promise<string> => {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set");
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const metaPrompt = `
    Actúa como un generador de indicaciones para ChatGPT de clase mundial. Tu objetivo es diseñar una indicación detallada y completa que produzca la mejor y más deseable respuesta contextualizada de ChatGPT para la siguiente solicitud específica.

    **Solicitud del Usuario:**
    "${USER_REQUEST}"

    **Detalles de la Actividad de Español (Plan de Mejoramiento):**
    ${ASSIGNMENT_DETAILS}

    **Instrucciones para la Indicación que Debes Generar:**
    1.  **Rol Principal:** La indicación debe comenzar pidiéndole a ChatGPT que actúe como un estudiante de décimo grado.
    2.  **Tono y Estilo:** Especifica que el tono debe ser el de un estudiante inteligente pero cansado. La redacción debe ser clara y directa, pero no excesivamente formal ni académica. El resultado debe ser "ligero de escribir", lo que implica oraciones no demasiado complejas y párrafos bien estructurados pero concisos.
    3.  **Estructura de la Respuesta:** Pide a ChatGPT que estructure la respuesta siguiendo los puntos del 1 al 6 de la actividad, usando títulos claros para cada sección.
    4.  **Longitud:** Enfatiza la restricción de longitud: "ni muy corto que parezca incompleto, ni muy largo que sea pesado de escribir a mano". Debe ser sustancioso pero conciso.
    5.  **Contenido:** Asegúrate de que la indicación cubra todos los requisitos de los puntos 1 a 6 de la actividad.
    6.  **Formato:** Sugiere formatos específicos cuando sea necesario (por ejemplo, para el cuadro comparativo del punto 4, pedir una estructura clara con viñetas o una tabla simple).
    7.  **Claridad:** La indicación final debe ser un bloque de texto único, listo para ser copiado y pegado en ChatGPT. No incluyas explicaciones sobre cómo creaste la indicación, solo la indicación final en español.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: metaPrompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error generating prompt:", error);
        if (error instanceof Error) {
            return `Error al generar la indicación: ${error.message}`;
        }
        return "Ocurrió un error desconocido al contactar la API de Gemini.";
    }
};
