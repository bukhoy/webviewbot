import { getClient } from "../client.js";

export async function takeScreenshot(url) {
    let client = await getClient()
    const {Page} = client;
    try {
        await Page.enable();
        await Page.navigate({url: url});
        await Page.loadEventFired();
        const {data} = await Page.captureScreenshot();
        return Buffer.from(data, 'base64');
    } catch (err) {
        throw new Error(err)
    } finally {
        await client.close();
    }
}