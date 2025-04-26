const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const config = require("../Data/config.json");
const { sendErrorDC, logError } = require("../Classes/errorLogging.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Shows info about commands"),
    async run(interaction, client) {
        try {
            const embed = new EmbedBuilder()
                .setTitle(`${client.user.username} Help`)
                .setAuthor({
                    name: interaction.user.tag,
                    iconURL: interaction.user.avatarURL(),
                })
                .setDescription(`Information and usage of ${client.user.username}`)
                .setColor(config.color)
                .setThumbnail(client.user.avatarURL({ dynamic: true }))
                .setTimestamp()
                .addFields([
                    { name: "/about", value: `Gives info about ${client.user.username}`, inline: false },
                    { name: "/help", value: `Gives info about ${client.user.username} text commands`, inline: false },
                    { name: "/voicehelp", value: `Gives info about ${client.user.username} voice commands`, inline: false },
                    { name: "/hello", value: "To get a hello message", inline: false },
                    { name: "/fish", value: "For fish gifs", inline: false },
                    { name: "/spin", value: "For spinny gifs", inline: false },
                    { name: "/ping", value: "Pings Ziver in a specific channel", inline: false },
                    { name: "/schedule", value: "For Ziver's upload schedule", inline: false },
                ]);

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            logError(error, "SC-help");
            sendErrorDC(client, interaction, "help", error);
            await interaction.reply({
                content: "Something went wrong, please contact an admin for help.",
                ephemeral: true,
            });
        }
    },
};