import { doInNewContext } from "../client.js";

export async function takeScreenshot(url) {
    return await doInNewContext(takeScreenshotInContext, url);
}

async function takeScreenshotInContext(client, url) {
    try {
        const { Page } = client;
        await Page.enable();
        await Page.navigate({ url });
        await Page.loadEventFired();
        let { contentSize } = await Page.getLayoutMetrics();
        const { data } = await Page.captureScreenshot({
            captureBeyondViewport: true,
            clip: { scale: 1, ...contentSize },
        });
        return Buffer.from(data, "base64");
    } catch (err) {
        throw err;
    }
}
