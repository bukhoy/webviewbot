import CDP from "chrome-remote-interface";

/**
 * Запуск action в отдельном контексте
 * @param {Function} action - 
 * @param {*} params - Параметры action
 * @returns action result
 */
export async function doInNewContext(action, params) {
    const { webSocketDebuggerUrl } = await CDP.Version();
    // connect to the DevTools special target
    const browser = await CDP({
        target: webSocketDebuggerUrl || "ws://localhost:9222/devtools/browser",
    });
    // create a new context
    const { Target } = browser;
    const { browserContextId } = await Target.createBrowserContext();
    const { targetId } = await Target.createTarget({
        url: "about:blank",
        browserContextId,
    });
    // connct to the new context
    const client = await CDP({ target: targetId });
    // perform user actions on it
    try {
        return await action(client, params);
    } finally {
        // cleanup
        await Target.closeTarget({ targetId });
        await browser.close();
    }
}
