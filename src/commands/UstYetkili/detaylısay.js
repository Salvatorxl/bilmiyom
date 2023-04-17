const serverSettings =require('../../models/sunucuayar')
const regstats = require("../../schemas/registerStats");
const { red } = require("../../configs/emojis.json")
const emoji = require("../../configs/emojis.json")
const moment = require("moment");
moment.locale("tr");

module.exports = {
  conf: {
    aliases: ["detaylısay"],
    name: "detaylısay",
    help: "detaylısay"
  },

  run: async (client, message, args, embed) => {

    if (!message.guild) return;
    let conf = await serverSettings.findOne({
      guildID: message.guild.id
  });

    if (!conf.teyitciRolleri.some(oku => message.member.roles.cache.has(oku)) && !conf.sahipRolu.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has('ADMINISTRATOR')) {
      message.react(red)
      return
    }

    if (!message.member.permissions.has(8n)) return message.channel.send({ embeds: [embed.setDescription(`${message.author}, Bu komutu kullanmak için yeterli yetkiye sahip değilsin!`)] }).then((e) => setTimeout(() => { e.delete(); }, 5000));
    const url = await message.guild.fetchVanityData();
    var ToplamYetkili = message.guild.members.cache.filter(yetkili => yetkili.roles.cache.has(conf.staffs[0])).size

    const ramal = message.channel.send({
      embeds: [embed
        .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setDescription(`
      \`\`\`\n${member.guild.name}\n\`\`\`
      
      <t:${Math.floor(Date.now() / 1000)}:R> **Tarihli Sunucu Verisi**
      
       Toplam ${rakam(message.guild.memberCount)} kullanıcı sunucumuzda bulunmaktadır.
       Sunucumuza **1 saat** içerisinde ${rakam(message.guild.members.cache.filter(ramal => (new Date().getTime() - ramal.joinedTimestamp) < 1000 * 60 * 60).size)} kullanıcı giriş yapmış.
       **1 gün** içerisinde ${rakam(message.guild.members.cache.filter(ramal => (new Date().getTime() - ramal.joinedTimestamp) < 1000 * 60 * 60 * 24).size)} kullanıcı giriş yapmış.
       Sunucumuza **1 hafta** içerisinde ${rakam(message.guild.members.cache.filter(ramal => (new Date().getTime() - ramal.joinedTimestamp) < 1000 * 60 * 60 * 24 * 7).size)} kullanıcı giriş yapmış.
       Sunucumuza **1 ay** içerisinde ${rakam(message.guild.members.cache.filter(ramal => (new Date().getTime() - ramal.joinedTimestamp) < 1000 * 60 * 60 * 24 * 30).size)} kullanıcı giriş yapmış.
       Sunucumuzda toplam Yetkili Sayısı: \`${ToplamYetkili}\`
      `)

    ]
  })
},
};
      function rakam(sayi) {
        var basamakbir = sayi.toString().replace(/ /g, "     ");
        var basamakiki = basamakbir.match(/([0-9])/g);
        basamakbir = basamakbir.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase();
        if (basamakiki) {
          basamakbir = basamakbir.replace(/([0-9])/g, d => {
            return {
              '0': `${emoji.sifir}`,
              '1': `${emoji.bir}`,
              '2': `${emoji.iki}`,
              '3': `${emoji.uc}`,
              '4': `${emoji.dort}`,
              '5': `${emoji.bes}`,
              '6': `${emoji.alti}`,
              '7': `${emoji.yedi}`,
              '8': `${emoji.sekiz}`,
              '9': `${emoji.dokuz}`
            }
            [d];
          })
        }
        return basamakbir;
      }