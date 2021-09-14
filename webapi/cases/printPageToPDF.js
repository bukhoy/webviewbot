import { getClient } from '../client.js';


export async function printPageToPDF(url) {
    let client = await getClient()
    const {Page} = client;
    try {
        await Page.enable();
        await Page.navigate({url: url});
        await Page.loadEventFired();
        const {data} = await Page.printToPDF({
            landscape: true,
            printBackground: true,
            marginTop: 0,
            marginBottom: 0,
            marginLeft: 0,
            marginRight: 0
        });
        return Buffer.from(data, 'base64');
    } catch (err) {
        throw err
    } finally {
        await client.close();
    }
}
