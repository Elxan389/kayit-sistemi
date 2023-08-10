const Discord = require('discord.js');
const embed = new Discord.EmbedBuilder()
const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.GuildMembers,
    Discord.GatewayIntentBits.MessageContent,
    Discord.GatewayIntentBits.Guilds,
  ]
});
const {token , logkanal , kayıtlırol} = require("./config")
client.once('ready', () => {
    console.log('Elit Code!');
});

client.on('messageCreate', (message) => {
  if (message.content.toLowerCase() === '!yardım') {
      const embed = new Discord.EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('Yardim')
      .setDescription("!kayıt <isim>")
      message.channel.send({ embeds: [embed] });
    }});


    client.on('messageCreate', (message) => {
      if (message.content.startsWith('!kayıt')) {
        const args = message.content.split(' ');
        
        if (args.length < 3) {
          message.channel.send('Geçersiz komut kullanımı! Örnek: `!kayit kullaniciAdi cinsiyet yas`');
          return;
        }
        
        const kullaniciAdi = args[1];
        const cinsiyet = args[2];
        const yas = args[3];
        const userID = message.author.id;

        const kayitMesaji = `Kullanıcı Adı: ${kullaniciAdi}\nID:${userID}\nCinsiyet: ${cinsiyet}\nYaş: ${yas}`;
        const channel = message.client.channels.cache.get(logkanal);
        channel.send(`Yeni kayıt geldi!\n${kayitMesaji}`);
      }
    });
    
    client.on('messageCreate', message => {
      if (message.content.startsWith('!kayıt-et')) {
        const member = message.mentions.members.first();
    
        if (!member) {
          message.reply('Etiketlenen bir üye bulunamadı!');
          return;
        }

        const args = message.content.split(' ')
        
        const yeniIsim = args[2]
    
        member.setNickname(yeniIsim)
          .then(() => {
            console.log(`${member.user.tag} ismi ${yeniIsim} olarak değiştirildi.`);
            const rolID = kayıtlırol;
        const rol = message.guild.roles.cache.get(rolID);

        if (!rol) {
          message.reply('Belirtilen rol bulunamadı!');
          return;
        }

        member.roles.add(rol)
          .then(() => {
            message.reply(`${member.user.tag} kişisine başarıyla rol verildi ve ismi değiştirildi.`);
          })
          .catch(err => {
            console.error('Rol verme veya isim değiştirme işlemi başarısız oldu.', err);
            message.reply('Bir hata oluştu ve rol verme/isim değiştirme işlemi başarısız oldu.');
          });
      })
      .catch(err => {
        console.error('İsim değiştirme işlemi başarısız oldu.', err);
        message.reply('Bir hata oluştu ve isim değiştirme işlemi başarısız oldu.');
      });
  }
});
 
client.login(token);
