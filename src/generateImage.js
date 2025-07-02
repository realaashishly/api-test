import * as fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";
import ImageFx from "@rohitaryal/imagefx-api";

// Configure environment variables
config();

// Get ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname("..");

// Initialize ImageFx
const fx = new ImageFx({
    authorizationKey: process.env.GOOGLE_AUTHORIZATION_KEY,
});

// Ensure the /out directory exists
const outputDir = path.join(__dirname, "out");
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

export const generateGoogleImage = async (prompt) => {
    if (!process.env.GOOGLE_AUTHORIZATION_KEY) {
        throw new Error("GOOGLE_AUTHORIZATION_KEY is missing from .env");
    }

    try {
        const resp = await fx.generateImage({
            prompt,
            aspectRatio: "IMAGE_ASPECT_RATIO_PORTRAIT",
            model: "IMAGEN_4",
            count: 1,
        });

        if (resp.Err || !resp.Ok || resp.Ok.length === 0) {
            throw new Error(resp.Err || "No valid image received");
        }

        const imageUrl = `image-1-${Date.now()}.png`;
        const imagePath = path.join(outputDir, imageUrl);

        fs.writeFileSync(imagePath, resp.Ok[0].encodedImage, "base64");
        console.log(`✅ Saved ${path.relative(__dirname, imagePath)}`);

        return {
            success: true,
            imageUrl,
        };
    } catch (error) {
        console.log("❌ Error generating image:", error.message);
        process.exit(1);
    }
};
