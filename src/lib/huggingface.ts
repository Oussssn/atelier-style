import { HfInference } from '@huggingface/inference';

// Initialize with a more robust API key handling
const getApiKey = () => {
  const key = import.meta.env.VITE_HUGGINGFACE_API_KEY;
  if (!key) {
    throw new Error('Hugging Face API key is not configured');
  }
  return key;
};

// Create the client with proper error handling
const createHfClient = () => {
  try {
    return new HfInference(getApiKey());
  } catch (error) {
    console.error('Failed to initialize Hugging Face client:', error);
    throw error;
  }
};

export async function generateImage(prompt: string): Promise<string[]> {
  try {
    // Match all outfit suggestions in different languages
    const outfitRegex = /(?:Here's your outfit suggestion|Aquí está tu sugerencia de outfit|İşte kıyafet önerim):\s*([^.!?\n]+)[.!?\n]/gi;
    const matches = [...prompt.matchAll(outfitRegex)];
    
    if (matches.length === 0) {
      console.log('No outfit descriptions found in prompt:', prompt);
      throw new Error('No outfit descriptions found');
    }

    // Generate images for all outfit descriptions
    const imagePromises = matches.map(async (match) => {
      const outfitDescription = match[1].trim();
      
      // Enhanced prompt engineering specifically for women's fashion
      const enhancedPrompt = `professional fashion photography, full body shot of a female model wearing ${outfitDescription}, fashion magazine style, studio lighting, clean white background, high end fashion, detailed fabric textures, 8k uhd, photorealistic, centered composition, professional fashion photography, high detail, fashion model pose, elegant, feminine`;
      
      // Create a new client for each request to ensure fresh connection
      const hf = createHfClient();
      
      const result = await hf.textToImage({
        model: 'stabilityai/stable-diffusion-xl-base-1.0',
        inputs: enhancedPrompt,
        parameters: {
          negative_prompt: 'male, man, masculine, deformed, distorted, disfigured, bad anatomy, wrong anatomy, extra limbs, missing limbs, floating limbs, disconnected limbs, mutation, mutated, ugly, disgusting, blurry, duplicate, watermark, text, logo, multiple people, group photo, collage, frame, border, cartoon, anime, illustration, drawing, painting, artwork, render, 3d, cgi',
          num_inference_steps: 50,
          guidance_scale: 7.5,
          width: 768,
          height: 1024,
          seed: Math.floor(Math.random() * 1000000)
        }
      });

      if (!result) {
        throw new Error('No result from image generation');
      }

      // Convert blob to base64
      const buffer = await result.arrayBuffer();
      const base64 = btoa(
        new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
      );
      
      return `data:image/jpeg;base64,${base64}`;
    });

    // Wait for all images to be generated
    return await Promise.all(imagePromises);
  } catch (error) {
    console.error('Error generating images:', error);
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        throw new Error('Invalid or missing API key for image generation');
      } else if (error.message.includes('Failed to fetch')) {
        throw new Error('Network error while connecting to image generation service');
      }
    }
    throw error;
  }
}