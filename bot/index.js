import { RateLimiter } from "@riddea/telegraf-rate-limiter";
import { Scenes, session, Telegraf } from "telegraf";
import { getVersionChrome } from "../webapi/cases/getVersionChrome.js";
import { superWizard } from "./superWizard.js";

const bot = new Telegraf(process.env.BOT_TOKEN);
const rateLimiter = new RateLimiter(1, 1000);
const stage = new Scenes.Stage([superWizard]);

bot.use(session());
bot.use(stage.middleware());

bot.use(async (ctx, next) => {
    const limited = rateLimiter.take(ctx.from.id);
    if (limited)
        return await ctx.reply("Hey! Wait 2 second before send new message!");
    await next();
});

bot.command("v", async (ctx) => {
    let version = await getVersionChrome();
    let { Browser, "Protocol-Version": Protocol, "V8-Version": v8 } = version;
    ctx.replyWithMarkdown(
        "Browser: `" +
            Browser +
            "`\nProtocol: `" +
            Protocol +
            "`\nV8-Version: `" +
            v8 +
            "`",
    );
});
bot.start((ctx) => ctx.reply("Отправь мне ссылку и выбери формат экспорта."));

bot.on("message", Scenes.Stage.enter("super-wizard"));

bot.catch((err, ctx) => {
    console.log(`Ooops, encountered an error for ${ctx.updateType}`, err);
    ctx.scene.leave();
});

bot.launch().then(console.log(`Bot started`));
