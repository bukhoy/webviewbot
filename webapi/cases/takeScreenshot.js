import { getClient } from "../client.js";

export async function takeScreenshot(url) {
    try {
        let client = await getClient()
        const {Page} = client;
        await Page.enable();
        await Page.navigate({url: url});
        await Page.loadEventFired();
        const {data} = await Page.captureScreenshot({
            captureBeyondViewport: true
        });
        return Buffer.from(data, 'base64');
    } catch (err) {
        throw err
    } finally {
        await client.close();
    }
}