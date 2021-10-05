import { Markup, Scenes } from "telegraf";
import { Helpers } from "../helpers.js";
import { stepHandler } from "./stepHandler.js";

export const superWizard = new Scenes.WizardScene(
    "super-wizard",
    async (ctx) => {
        if (!new Helpers().isValidHttpUrl(ctx.message.text)) {
            ctx.reply("Это не url...");
            return ctx.scene.leave();
        }
        ctx.wizard.state.url = ctx.message.text;
        ctx.reply(
            "Экспортировать в ...",
            Markup.inlineKeyboard([
                Markup.button.callback("PDF файл", "pdf"),
                Markup.button.callback("Скриншот", "png"),
                Markup.button.callback("Закрыть", "exit"),
            ]),
        );
        return ctx.wizard.next();
    },
    async (ctx) => {
        ctx.deleteMessage();
        ctx.reply(
            "Экспортировать...",
            Markup.inlineKeyboard([
                Markup.button.callback("Стандартный", "png_default"),
                Markup.button.callback("Всего документа", "png_full"),
            ]),
        );
        return ctx.wizard.next();
    },
    stepHandler,
);
