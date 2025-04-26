const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const config = require("../Data/config.json");
const { sendErrorDC, logError } = require("../Classes/errorLogging.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("voicehelp")
        .setDescription("Shows info about voice commands"),
    async run(interaction, client) {
        try {
            const embed = new EmbedBuilder()
                .setTitle(`${client.user.username} Voice Help`)
                .setAuthor({
                    name: interaction.user.tag,
                    iconURL: interaction.user.avatarURL(),
                })
                .setDescription(`Information and usage of ${client.user.username} voice commands`)
                .setColor(config.color)
                .setThumbnail(client.user.avatarURL({ dynamic: true }))
                .setTimestamp()
                .setFooter({ text: "You must be in a voice channel to use these commands" })
                .addFields([
                    { name: "/voicedc", value: "Disconnects the bot from the voice channel", inline: false },
                    { name: "/play", value: `Plays the audio that you selected`, inline: false },
                ]);

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            logError(error, "SC-voicehelp");
            sendErrorDC(client, interaction, "voicehelp", error);
            await interaction.reply({
                content: "Something went wrong, please contact an admin for help.",
                ephemeral: true,
            });
        }
    },
};