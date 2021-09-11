import dotenv from 'dotenv';


dotenv.config()
if (process.env.BOT_TOKEN === undefined) {
  console.log('BOT_TOKEN must be provided!');
  process.exit(0);
}

import('./bot/index.js')