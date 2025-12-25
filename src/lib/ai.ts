import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function analyzeEntryWithAI(content: string) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
      You are an empathetic and professional mental health companion. 
      Analyze the following journal entry and provide two things:
      1. A sentiment classification (strictly one of: Positive, Neutral, Negative, Anxious, Frustrated, Hopeful).
      2. A short, therapeutic, and actionable piece of advice or insight (max 2 sentences).
      
      Output format: JSON with keys "sentiment" and "advice".
      
      Journal Entry: "${content}"
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error("Failed to parse AI response");
        }

        const data = JSON.parse(jsonMatch[0]);
        return {
            sentiment: data.sentiment || "Neutral",
            advice: data.advice || "Thank you for sharing. Remember to be kind to yourself."
        };

    } catch (error) {
        console.error("AI Analysis Failed:", error);
        return {
            sentiment: "Neutral",
            advice: "We couldn't reach the AI at this moment, but writing down your thoughts is already a great step forward."
        };
    }
}

export async function chatWithAI(userMessage: string, conversationHistory: Array<{ role: string, content: string }>) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const systemContext = `You are CalmBot, an empathetic mental health companion for CalmZone. 
    Your role is to provide supportive, non-judgmental responses that encourage self-reflection and well-being.
    
    Crisis keywords to watch for: suicide, self-harm, hurt myself, end it all, no point living
    If you detect crisis language, respond with empathy and provide the crisis hotline: 8448-8448-45 (India)
    
    Keep responses concise (2-3 sentences), warm, and actionable.`;

        // Build conversation context
        const contextMessages = conversationHistory.slice(-6).map(msg =>
            `${msg.role === 'user' ? 'User' : 'CalmBot'}: ${msg.content}`
        ).join('\n');

        const prompt = `${systemContext}\n\nConversation:\n${contextMessages}\nUser: ${userMessage}\nCalmBot:`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text().trim();

    } catch (error) {
        console.error("Chat AI Failed:", error);
        return "I'm having trouble connecting right now. Please try again in a moment, or if you're in crisis, call 8448-8448-45 immediately.";
    }
}

export async function generateMoodInsights(moodData: Array<{ moodScore: number, createdAt: Date | null, note: string | null }>) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const moodSummary = moodData.map((m, i) =>
            `Day ${i + 1}: Score ${m.moodScore}/5${m.note ? ` (${m.note})` : ''}`
        ).join('\n');

        const prompt = `Analyze this 30-day mood tracking data and provide 3 insights:
1. Overall pattern/trend
2. Notable observation
3. One actionable suggestion

Data:
${moodSummary}

Return JSON: {"pattern": "...", "observation": "...", "suggestion": "..."}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error("Failed to parse");

        return JSON.parse(jsonMatch[0]);

    } catch (error) {
        console.error("Mood Insights Failed:", error);
        return {
            pattern: "Keep tracking your moods to see patterns emerge.",
            observation: "Every day is a new opportunity for growth.",
            suggestion: "Try journaling when you notice mood changes."
        };
    }
}
