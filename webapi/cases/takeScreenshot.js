import { doInNewContext } from "../client.js";

export async function takeFullScreenshot(url) {
    return await doInNewContext(takeFullScreenshotInContext, url);
}

export async function takeScreenshot(url) {
    return await doInNewContext(takeScreenshotInContext, url);
}

async function takeFullScreenshotInContext(client, url) {
    try {
        const { Page } = client;
        await Page.enable();
        await Page.navigate({ url });
        await Page.loadEventFired();
        let { cssContentSize } = await Page.getLayoutMetrics();
        const { data } = await Page.captureScreenshot({
            captureBeyondViewport: true,
            clip: { scale: 1, ...cssContentSize },
        });
        return Buffer.from(data, "base64");
    } catch (err) {
        throw err;
    }
}

async function takeScreenshotInContext(client, url) {
    try {
        const { Page } = client;
        await Page.enable();
        await Page.navigate({ url });
        await Page.loadEventFired();
        const { data } = await Page.captureScreenshot({
            captureBeyondViewport: true,
        });
        return Buffer.from(data, "base64");
    } catch (err) {
        throw err;
    }
}
