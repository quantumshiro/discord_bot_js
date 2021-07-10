const Discord = require('discord.js')
const client = new Discord.Client()
const prefix = '!'

client.on('ready', () => {
    console.log('${client.user.tag}でログインしています。')
})

client.on('message', async message => {
    if (message.content === '!ping') {
        message.channel.send('Pong!')
    }``
})

client.on('message', message => {
    if (!message.content.startsWith(prefix)) return
    const [command, ...args] = message.content.slice(prefix.length).split(' ')
    if (command === 'timer') {
        // 引数から待ち時間を取り出す
        const seconds = Number(args[0])
        message.channel.send(`タイマーを${seconds}秒に設定しました。`)
        setTimeout(() => {
            message.reply(`${seconds}秒経ちました`)
        }, seconds * 1000) // setTimeoutに指定するのはミリ秒なので秒数に1000を掛ける
    }
})

client.login('ODAxODYxODQ0NzYyNjI0MDYx.YAm2CQ.b4ouybW_PEHCPMfzbwEq0DjCF9U')
