import { Markup, Scenes } from "telegraf";
import { stepHandler } from "./stepHandler.js";

export const superWizard = new Scenes.WizardScene(
    "super-wizard",
    (ctx) => {
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
    stepHandler,
);
