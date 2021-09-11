import CDP from 'chrome-remote-interface';


export default async function takeScreenshot(url) {
    let client = await CDP();
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