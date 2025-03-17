import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const DAILY_LIMIT = parseInt(process.env.OPENAI_RATE_LIMIT_PER_DAY || '50');

export async function analyzeMedicineInteractions(
  medicines: string[],
  userId: string,
  supabase: any
): Promise<{ result: string; error?: string }> {
  try {
    // Check if user has exceeded rate limit
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    
    const { count, error } = await supabase
      .from('ai_requests')
      .select('*', { count: 'exact' })
      .eq('user_id', userId)
      .gte('created_at', `${today}T00:00:00Z`)
      .lt('created_at', `${today}T23:59:59Z`);
    
    if (error) throw error;
    
    if (count && count >= DAILY_LIMIT) {
      return { 
        result: "You've reached your daily limit of AI analysis requests. Please try again tomorrow.",
        error: "Rate limit exceeded"
      };
    }
    
    // Proceed with OpenAI request
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that analyzes potential medicine interactions. Provide detailed information about possible interactions, side effects, and precautions. Include references to medical literature when possible. Always include a disclaimer that this is not medical advice and users should consult healthcare professionals."
        },
        {
          role: "user",
          content: `Analyze potential interactions between these medicines: ${medicines.join(", ")}`
        }
      ],
      temperature: 0.3,
      max_tokens: 800,
    });

    const result = response.choices[0]?.message?.content || "No analysis available.";
    
    // Log the request
    await supabase.from('ai_requests').insert({
      user_id: userId,
      medicines,
      result,
    });
    
    return { result };
  } catch (error: any) {
    console.error("Error analyzing medicine interactions:", error);
    return { 
      result: "An error occurred while analyzing medicine interactions. Please try again later.",
      error: error.message
    };
  }
}
