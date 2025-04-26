const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const config = require("../Data/config.json");
const { sendErrorDC, logError } = require("../Classes/errorLogging.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("about")
        .setDescription("Shows info about the bot"),
    async run(interaction, client) {
        try {
            const embed = new EmbedBuilder()
                .setTitle(`About ${client.user.username}`)
                .setAuthor({
                    name: interaction.user.tag,
                    iconURL: interaction.user.avatarURL(),
                })
                .setTimestamp()
                .setDescription(`Information about ${client.user.username}`)
                .setColor(config.color)
                .setThumbnail(client.user.avatarURL({ dynamic: true }))
                .addFields([
                    { name: "Bot Version", value: config.botVersion, inline: false },
                    { name: "Bot Name", value: client.user.username, inline: false },
                    { name: "Code", value: "Written in JavaScript using discord.js v14.9.0", inline: false },
                    { name: "Contributor", value: "-Thimo-", inline: false },
                ]);

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            logError(error, "SC-about");
            sendErrorDC(client, interaction, "about", error);
            await interaction.reply({
                content: "Something went wrong, please contact an admin for help.",
                ephemeral: true,
            });
        }
    },
};