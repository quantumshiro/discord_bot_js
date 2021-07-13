const Discord = require('discord.js')
const client = new Discord.Client()
const ytdl = require('ytdl-core')
const prefix = '!'

client.on('ready', () => {
    console.log('${client.user.tag}でログインしています。')
})

client.on('message', async message => {
    if (message.content === '!ping') {
        message.channel.send('Pong!')
    }
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

 client.on('message', async message => {
   // メッセージが "!yt" からはじまっていてサーバー内だったら実行する
   if (message.content.startsWith('!yt') && message.guild) {
     // メッセージから動画URLだけを取り出す
     const url = message.content.split(' ')[1]
     // まず動画が見つからなければ処理を止める
     if (!ytdl.validateURL(url)) return message.reply('動画が存在しません！')
     // コマンドを実行したメンバーがいるボイスチャンネルを取得
     const channel = message.member.voice.channel
     // コマンドを実行したメンバーがボイスチャンネルに入ってなければ処理を止める
     if (!channel) return message.reply('先にボイスチャンネルに参加してください！')
     // チャンネルに参加
     const connection = await channel.join()
     // 動画の音源を取得
     const stream = ytdl(ytdl.getURLVideoID(url), { filter: 'audioonly' })
     // 再生
     const dispatcher = connection.play(stream)
     
     // 再生が終了したら抜ける
     dispatcher.once('finish', () => {
       channel.leave()
     })
   }
 })

client.login('ODAxODYxODQ0NzYyNjI0MDYx.YAm2CQ.0S2M9keFNPtoryLPpLvx96cTaBY')
