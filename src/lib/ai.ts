// Simulated AI service
// Returns deterministic responses based on keywords to demonstrate the features

export async function analyzeEntryWithAI(content: string) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const lower = content.toLowerCase();

    let sentiment = "Neutral";
    let advice = "Thank you for sharing. Writing down your thoughts is a great first step. consider taking a moment to reflect on what you can control in this situation.";

    if (lower.includes("sad") || lower.includes("cry") || lower.includes("lonely") || lower.includes("bad")) {
        sentiment = "Negative";
        advice = "I hear that you're going through a tough time. It's okay to feel this way. Be gentle with yourself today. Have you considered reaching out to a friend or taking a short walk to change your environment?";
    } else if (lower.includes("anxious") || lower.includes("stress") || lower.includes("worry") || lower.includes("panic")) {
        sentiment = "Anxious";
        advice = "It sounds like there's a lot on your mind. Try the 4-7-8 breathing technique: inhale for 4, hold for 7, exhale for 8. Grounding yourself in the present moment can help reduce these feelings.";
    } else if (lower.includes("happy") || lower.includes("good") || lower.includes("great") || lower.includes("joy") || lower.includes("love")) {
        sentiment = "Positive";
        advice = "It's wonderful that you're feeling this way! capturing these moments is so important. What was the specific trigger for this joy? Remembering it can help you find it again later.";
    } else if (lower.includes("angry") || lower.includes("mad") || lower.includes("frustrat")) {
        sentiment = "Frustrated";
        advice = "Anger is a valid emotion and often tells us a boundary has been crossed. Try to express this energy physically through exercise or writing a letter you don't send, to release the tension safely.";
    }

    return { sentiment, advice };
}
