import { gods, props, settings, softColors, vividColors } from "../constant.js";


function getRandomNumber() {
    return Math.floor(Math.random() * 50);
}

export const generatePrompt = () => {
    const randInt = getRandomNumber();

    const god = gods[randInt];
    const color1 = vividColors[randInt];
    const color2 = softColors[randInt];
    const item = props[randInt];
    const place = settings[randInt];

    return `Create a detailed description of a crochet doll-style representation of ${god}, made with soft yarn textures and intricate handcrafted details.
            The doll should be dressed in a vivid ${color1} accent and a delicate ${color2} garment, holding a small ${item}.
            Set the scene in a cozy ${place}, with a muted and warm atmosphere that conveys a charming, nostalgic feel.
            `;
};
