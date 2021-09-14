import { RateLimiter } from "@riddea/telegraf-rate-limiter";
import { Scenes, session, Telegraf } from 'telegraf';
import { getVersionChrome } from '../webapi/cases/getVersionChrome.js';
import { superWizard } from "./superWizard.js";

const bot = new Telegraf(process.env.BOT_TOKEN)
const rateLimiter = new RateLimiter(2, 2000);
const stage = new Scenes.Stage([superWizard])

bot.use(session())
bot.use(stage.middleware())

bot.use(async (ctx, next) => {
    const limited = rateLimiter.take(ctx.from.id);
    if (limited) return await ctx.reply("Hey! Wait 2 second before send new message!");
    await next()
})

bot.command('v', async (ctx) => {
    let msg = '';
    let result = await getVersionChrome()
    Object.entries(result).forEach(([key, value]) => {
        msg = msg + key + ': `' + value + '`\n'
    })
    ctx.replyWithMarkdown(msg);
})

bot.on('message', Scenes.Stage.enter('super-wizard'))

bot.catch((err, ctx) => {
    console.log(`Ooops, encountered an error for ${ctx.updateType}`, err)
})

bot.launch().then(console.log(`Bot started`))