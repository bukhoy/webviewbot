import { Telegraf} from 'telegraf'
import { RateLimiter } from "@riddea/telegraf-rate-limiter";
import printPageToPDF from '../webapi/cases/printPageToPDF.js'
import takeScreenshot from '../webapi/cases/takeScreenshot.js'


const bot = new Telegraf(process.env.BOT_TOKEN)
const rateLimiter = new RateLimiter(2, 2000);

bot.use(async (ctx, next) => {
    const limited = rateLimiter.take(ctx.from.id);
    if (limited) return await ctx.reply("Hey! Wait 2 second before send new message!");
    await next()
})

bot.on('message', async (ctx) => {
    try {
        ctx.state.url = ctx.message.text
        ctx.replyWithDocument({
            source: await printPageToPDF(ctx.state.url),
            filename: `Page at ${new Date().toLocaleString()}.pdf`
        })
        ctx.replyWithDocument({
            source: await takeScreenshot(ctx.state.url),
            filename: `Screenshot at ${new Date().toLocaleString()}.png`
        })       
    } catch (error) {
        ctx.reply('Произошла ошибка' + error)
    }
})

bot.catch((err, ctx) => {
    console.log(`Ooops, encountered an error for ${ctx.updateType}`, err)
})

bot.launch().then(console.log(`Bot started`))