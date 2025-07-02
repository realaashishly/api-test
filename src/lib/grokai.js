import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_APIKEY,
});

const SYSTEM_PROMPT = `You are a social media expert with a knack for creating engaging and viral content specifically for Instagram. Your specialty lies in crafting witty, emotional, and viral content in casual, WhatsApp-style language that resonates with Indian audiences.

                        Your task is to create a viral **WhatsApp-style caption** and **3-5 trending hashtags** for the following input prompt: [prompt].

                        Guidelines:
                        - Caption must be in **casual, WhatsApp-style Hinglish (Hindi + English)** language.
                        - Use **different names or titles** of the mentioned Indian God or Goddess in the caption.
                        - Keep the caption **short, emotional, or witty** (max 15 words), with **emojis** for better engagement.
                        - Hashtags must be related to **Indian gods**, **morning vibes**, **spiritual art**, or **desi culture aesthetics**.

                        Return output in the following JSON format:
                        {
                            "result": {
                                "caption": "",
                                "hashtags": []
                            }
                        }
`;

export const generateImageCaptionAndHashtags = async (prmpt) => {
    const chatCompletion = await groq.chat.completions.create({
        messages: [
            {
                role: "system",
                content: SYSTEM_PROMPT,
            },
            {
                role: "user",
                content: prmpt,
            },
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 1,
        max_completion_tokens: 1024,
        top_p: 1,
        stream: false,
        response_format: {
            type: "json_object",
        },
        stop: null,
    });

    return JSON.parse(chatCompletion.choices[0].message.content);
};
