import { uploadPhotoToFacebook } from "./src/facebookpost.js";
import { generateGoogleImage } from "./src/generateImage.js";
import { generatePrompt } from "./src/generatePrompt.js";
import { generateImageCaptionAndHashtags } from "./src/lib/grokai.js";
import { clearOutFolder } from "./src/lib/index.js";

// import cron from "node-cron";

const automation = async () => {
    const txt = await generatePrompt();
    const details = await generateImageCaptionAndHashtags(txt);
    const imgPath = await generateGoogleImage(txt);
    const data = {
        caption: details.result.caption,
        hashtags: details.result.hashtags,
        imagePath: imgPath.imageUrl,
    };
    await uploadPhotoToFacebook(data);
    clearOutFolder();
};

cron.schedule("*/20 * * * *", () => {
    console.log("==== Job started ====");
    automation();
    console.log("==== Job executed ====");
});
