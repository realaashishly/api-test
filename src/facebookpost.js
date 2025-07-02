import axios from "axios";
import { config } from "dotenv";
import fs from "fs";
import FormData from "form-data";

config();

const pageId = process.env.FB_PAGE_ID;
const version = process.env.FB_GRAPH_VERSION || "v23.0";
const accessToken = process.env.FB_PAGE_ACCESS_TOKEN;

if (!pageId || !accessToken) {
    console.error("❌ FB_PAGE_ID or FB_ACCESS_TOKEN is missing in .env");
    process.exit(1);
}

const baseUrl = "https://graph.facebook.com";


export const uploadPhotoToFacebook = async (p) => {
    try {
        const form = new FormData();
        const imagePath = `./out/${p.imagePath}`;
        form.append("source", fs.createReadStream(imagePath));

        const finalCaption = `${p.caption} ${p.hashtags.join(" ")}`.trim();
        form.append("caption", finalCaption);
        form.append("published", "true");

        const response = await axios.post(
            `${baseUrl}/${version}/${pageId}/photos`,
            form,
            {
                headers: {
                    ...form.getHeaders(),
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        console.log("✅ Photo posted successfully!");
        console.log(response.data);
    } catch (error) {
        console.error(
            "❌ Upload failed:",
            error.response?.data || error.message
        );
        process.exit(1);
    }
};
