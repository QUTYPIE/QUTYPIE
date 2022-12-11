const { Message, Client, MessageEmbed } = require("discord.js");
module.exports = {
    name: "ban",
    aliases: ['b'],
    category: 'mod',
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
      if (!message.member.permissions.has("BAN_MEMBERS")) {
        return message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(`${client.emoji.cross} | You must have \`Ban Members\` permissions to use this command.`)]});
      }
      let isown = message.author.id == message.guild.ownerId;
      const user = message.mentions.members.first() ||  message.guild.members.cache.get(args[0]);
      let rea = args.slice(1).join(" ") || "No Reason Provided"
      rea = `${message.author.tag} (${message.author.id}) | ` + rea;
      const emisai = new MessageEmbed()
      .setDescription(`${client.emoji.cross} | User Not Found`)
      .setColor(client.color)
      const saileon = new MessageEmbed()
      .setDescription(`${client.emoji.cross} | Mention the user first`)
      .setColor(client.color)
      if(!user) return message.reply({embeds: [saileon]})
      if(user === undefined) return message.reply({embeds: [emisai]})
      
      if(user.id === client.user.id) return message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(`${client.emoji.cross} | You can't ban me.`)]})
      
      if(user.id === message.guild.ownerId) return message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(`${client.emoji.cross} | I can't ban the owner of this server.`)]})
      if(!client.util.hasHigher(message.member)){
        return message.channel.send({embeds: [new MessageEmbed().setColor(client.color).setDescription(`${client.emoji.cross} | You must have a higher role than me to use this command.`)]});
      }
      if(message.guild.me.roles.highest.position <= user.roles.highest.position && !isown){
        return message.channel.send({embeds: [new MessageEmbed().setColor(client.color).setDescription(`${client.emoji.cross} | My highest role is below than <@${user.id}>.`)]});
      }
      if(message.member.roles.highest.position <= user.roles.highest.position && !isown) {
        return message.channel.send({embeds: [new MessageEmbed().setColor(client.color).setDescription(`${client.emoji.cross} | You must have a higher role than <@${user.id}> to use this command.`)]});
      }
      
      if(!user.bannable){
        const embed = new MessageEmbed()
        .setDescription(`${client.emoji.cross} | I can't ban this user.`)
        .setColor(client.color)
        return message.reply({embeds: [embed]})
    }
    user.ban({reason: rea})
    const done = new MessageEmbed()
    .setDescription(`${client.emoji.tick} | Successfully banned **${user.user.tag}** from the server.`)
    .setColor(client.color)
    return message.channel.send({embeds: [done]})
    }
};