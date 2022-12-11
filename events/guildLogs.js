const client = require('../index');
const { MessageEmbed } =  require('discord.js');
const join = '1033593637684133988';
const leave = '1033593638653022308';
const db = require('../core/db');

module.exports = async (client) => {
  client.on("guildCreate", async (guild) => {
    const ser = client.guilds.cache.size;
    
    const use = client.guilds.cache.filter((guild) => guild.available).reduce((prev, guild) => prev + guild.memberCount, 0);
    
    const channel = await client.channels.fetch(join);
    var emoji = "";
    let own = await guild.fetchOwner()
    let links = guild.bannerURL({ dynamic: true, size: 1024 });
    if (guild.partnered && guild.verified)
      emoji = `<:partners:1026903940685627443><:verified:1029385508457037855>`;
    else if (guild.partnered && !guild.verified)
      emoji = "<:partners:1026903940685627443>";
    else if (!guild.partnered && guild.verified)
      emoji = "<:verified:1029385508457037855>";
    else if (!guild.partnered && !guild.verified)
      emoji = "<:vbVoteCrossCyan:1027966735153905724>";
    const embed = new MessageEmbed()
      .setDescription(`Id: **${guild.id}**\nName: **${guild.name}**\nDiscord Level: ${emoji}\nMemberCount: \`${guild.memberCount + 1}\`\nCreated At: <t:${Math.round(guild.createdTimestamp / 1000)}> (<t:${Math.round(guild.createdTimestamp / 1000)}:R>)\nJoined At: <t:${Math.round(guild.joinedTimestamp / 1000)}> (<t:${Math.round(guild.joinedTimestamp / 1000)}:R>)`)
      .addField(`**Owner**`, `Info: **${guild.members.cache.get(own.id) ? guild.members.cache.get(own.id).user.tag : "Unknown user"} (${own.id})**\nMentions: <@${own.id}>\nCreated At: <t:${Math.round(own.user.createdTimestamp / 1000)}> (<t:${Math.round(own.user.createdTimestamp / 1000)}:R>)`)
      .addField(`**${client.user.username}'s Total Servers**`, `\`\`\`js\n${ser}\`\`\``, true)
      .addField(`**${client.user.username}'s Total Users**`, `\`\`\`js\n${use}\`\`\``, true)
      .addField(`**Shard Id**`, `\`\`\`js\n${guild.shardId}\`\`\``, true)
      .setTitle(guild.name)
      .setThumbnail(guild.iconURL({
        dynamic: true,
        size: 1024
      }))
      .setColor(client.color)
    if (guild.vanityURLCode) {
      let temp = `https://discord.gg/` + guild.vanityURLCode;
      embed.setURL(temp)
    }
    if (guild.banner)
      embed.setImage(links)
    await channel.send({embeds: [embed]})
  })


  client.on("guildDelete", async (guild) => {
    const ser = client.guilds.cache.size;
  
    const use = client.guilds.cache.filter((guild) => guild.available).reduce((prev, guild) => prev + guild.memberCount, 0);

    const channel = await client.channels.fetch(leave);
    let links = guild.bannerURL({ dynamic: true, size: 1024 });
    const embed = new MessageEmbed()
      .setDescription(`Id: **${guild.id}**\nName: **${guild.name}**\nMemberCount: \`${guild.memberCount + 1}\`\nCreated At: <t:${Math.round(guild.createdTimestamp / 1000)}> (<t:${Math.round(guild.createdTimestamp / 1000)}:R>)\nJoined At: <t:${Math.round(guild.joinedTimestamp / 1000)}> (<t:${Math.round(guild.joinedTimestamp / 1000)}:R>)`)
      .addField(`**${client.user.username}'s Total Servers**`, `\`\`\`js\n${ser}\`\`\``, true)
      .addField(`**${client.user.username}'s Total Users**`, `\`\`\`js\n${use}\`\`\``, true)
    if (guild.available)
      embed.setTitle(guild.name)
    embed.setThumbnail(guild.iconURL({
      dynamic: true,
      size: 1024
    }))
    embed.setColor(client.color)
    if (guild.vanityURLCode) {
      let temp = `https://discord.gg/` + guild.vanityURLCode;
      embed.setURL(temp)
    }
    if (guild.banner)
      embed.setImage(links)
    await channel.send({embeds: [embed]})
  })
}