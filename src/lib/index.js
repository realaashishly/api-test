import axios from "axios";
import { config } from "dotenv";
config();

const getLongLivedToken = async () => {
    const appId = "1082952763412831";
    const appSecret = "b127eefffe978135a8fd56110ad937e8";
    const shortToken = "'EAABsbCS1iHgBA...';";

    const url = `https://graph.facebook.com/v18.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${appId}&client_secret=${appSecret}&fb_exchange_token=${shortToken}`;

    const res = await axios.get(url);
    console.log("✅ Long-Lived Token:", res.data.access_token);
};

import fs from "fs";
import path from "path";

/**
 * Deletes all files inside the /out/ directory.
 */
export const clearOutFolder = () => {
    const outDir = path.join(process.cwd(), "out"); // absolute path to /out

    fs.readdir(outDir, (err, files) => {
        if (err) {
            console.error("❌ Failed to read /out directory:", err);
            return;
        }

        files.forEach((file) => {
            const filePath = path.join(outDir, file);

            // Delete only files (not subdirectories)
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.error(`⚠️ Error reading file ${file}:`, err);
                    return;
                }

                if (stats.isFile()) {
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            console.error(`❌ Failed to delete ${file}:`, err);
                        } else {
                            console.log(`✅ Deleted: ${file}`);
                        }
                    });
                }
            });
        });
    });
};
