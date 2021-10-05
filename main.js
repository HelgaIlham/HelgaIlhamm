const { exec,execSync,spawn } = require('child_process');
const { WAConnection, Functions } = require('./lib/functions.js');
const Command = require('./lib/command.js');

global.baileys = require('@adiwajshing/baileys');
global.botinfo = require('./src/json/botInfo.json');
global.userDb = require('./src/json/user.json');
global.groupDb = require('./src/json/group.json');
global.functions = new Functions();
global.client = new WAConnection();
global.cmd = new Command(client, global.botinfo, global.functions);
global.logo = {buffer:functions.fs.readFileSync("./src/images/20210929_225016.png")}
global.clients = [];
global.used_logo = 0

async function run(){
try {
await functions.start();
for (let a of functions.fs.readdirSync('./lib/command')) require(`./lib/command/${a}`)
for (let b of functions.fs.readdirSync('./lib/actions')) require(`./lib/actions/${b}`);
await functions.delay(1000);
functions.animate.succeed('Loading',{text:'Checking And Adding New Command Succeed'});
client.logger.level = 'error';
client.browserDescription = ['Zacros','Safari','3.0'];
botinfo.session && await client.loadAuthInfo(botinfo.session);
await client.connect({timeoutMs: 30000});
} catch(e) {
console.log(e)
}
}
run();
