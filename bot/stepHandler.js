import { Composer } from "telegraf";
import { Helpers } from "../helpers.js";
import { printPageToPDF } from "../webapi/cases/printPageToPDF.js";
import { takeScreenshot } from "../webapi/cases/takeScreenshot.js";

export const stepHandler = new Composer();
stepHandler.action("pdf", async (ctx) => {
    try {
        ctx.deleteMessage();
        ctx.replyWithChatAction("upload_document");
        ctx.replyWithDocument({
            source: await printPageToPDF(ctx.wizard.state.url),
            filename: `Page at ${new Helpers().formatDate()}.pdf`,
        });
    } catch (error) {
        ctx.replyWithMarkdown("Произошла ошибка: `" + error + "`");
    } finally {
        return ctx.scene.leave();
    }
});
stepHandler.action("png", async (ctx) => {
    try {
        ctx.deleteMessage();
        ctx.replyWithChatAction("upload_document");
        ctx.replyWithDocument({
            source: await takeScreenshot(ctx.wizard.state.url),
            filename: `Screenshot at ${new Helpers().formatDate()}.png`,
        });
    } catch (error) {
        ctx.replyWithMarkdown("Произошла ошибка: `" + error + "`");
    } finally {
        return ctx.scene.leave();
    }
});
stepHandler.action("exit", (ctx) => {
    ctx.deleteMessage();
    ctx.scene.leave();
});
stepHandler.use((ctx) => {
    ctx.reply("Необходимо выбрать тип экспорта");
    return ctx.scene.leave();
});
