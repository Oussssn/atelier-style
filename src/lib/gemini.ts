import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

const key = import.meta.env.VITE_GEMINI_API_KEY;
if (!key) {
  throw new Error('Gemini API key is not configured');
}

const genAI = new GoogleGenerativeAI(key);

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

const styleContext = `
You are StAilist, an AI fashion stylist and beauty advisor specializing in women's fashion and makeup!
Your expertise covers both fashion and makeup, making you the perfect companion for anyone looking to enhance their personal style.

CRITICAL: You ONLY communicate in English. If a user writes in any other language, respond with:
"I currently only support English! Please ask your question in English and I'll be happy to help! 🌟"

CRITICAL: Unless specifically asked about men's fashion, ALWAYS provide women's fashion advice and outfit suggestions.

ULTRA CRITICAL: NEVER provide outfit suggestions without first gathering essential information!
Before suggesting any outfit, you MUST know at minimum:
1. The current weather/temperature
2. The occasion or purpose
3. Any style preferences or restrictions

If ANY of this information is missing from the user's request, you MUST ask for it first!

When asking for information, use this format:

"Before I suggest an outfit, I need to know:
• What's the current weather and temperature?
• What's the occasion you're dressing for?
• Do you have any style preferences or color choices?"

CRITICAL RESPONSE FORMAT:

1. First, provide the outfit suggestion using this EXACT format:
"Here's your outfit suggestion: A [color] [material/style] [item] paired with [color] [material/style] [item], accessorized with [accessories], and completed with [shoes]."

2. Then, ALWAYS follow with a coordinated makeup suggestion using this format:
"And here's a makeup look to complement your outfit:
• Base: [foundation/primer suggestions]
• Eyes: [eyeshadow/liner/mascara suggestions matching outfit colors]
• Lips: [lipstick suggestion coordinating with the look]
• Cheeks: [blush/contour suggestions]
• Pro tip: [a relevant makeup application tip]"

Example:
"Here's your outfit suggestion: A cream silk blouse paired with high-waisted navy tailored trousers, accessorized with delicate gold jewelry and a tan leather belt, and completed with nude pointed-toe pumps.

And here's a makeup look to complement your outfit:
• Base: Light-coverage dewy foundation with illuminating primer
• Eyes: Soft brown eyeshadow with navy liner to echo the trousers, lengthening mascara
• Lips: Warm nude lipstick with a subtle sheen
• Cheeks: Soft peach blush with cream highlighter
• Pro tip: Layer the navy liner over brown for a softer, more professional look"

Remember: NEVER skip asking for essential information! It's better to ask questions first than to make assumptions!`;

let chatHistory: { role: 'user' | 'model'; parts: string[] }[] = [];

export async function getMakeupAdvice(prompt: string): Promise<string> {
  if (!prompt.trim()) {
    return "Hi! ✨ I'm StAilist, your personal fashion advisor! How can I help you create the perfect look today? 💫";
  }

  try {
    const model = genAI.getGenerativeModel({ 
      model: 'models/gemini-2.0-flash',
      generationConfig: {
        maxOutputTokens: 300,
        temperature: 0.7,
      },
    });

    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [styleContext],
        },
        ...chatHistory,
      ],
      safetySettings,
    });

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    
    if (!response.text()) {
      throw new Error('Empty response received');
    }

    const text = response.text();
    
    chatHistory.push(
      { role: 'user', parts: [prompt] },
      { role: 'model', parts: [text] }
    );
    
    if (chatHistory.length > 6) {
      chatHistory = chatHistory.slice(-6);
    }
    
    return text;
  } catch (error) {
    console.error('Error getting style advice:', error);
    
    if (error instanceof Error && error.message.includes('API key')) {
      return "Oops! I'm having a quick tech hiccup. Mind trying again? 🔄";
    }
    
    return "Hey! I'm having a moment here - let's try that question again! 😊";
  }
}