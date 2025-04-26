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
                    { name: "/intro", value: `Plays ${client.user.username} introduction`, inline: false },
                    { name: "/cheese", value: "Plays cheese sound", inline: false },
                    { name: "/burp", value: "Plays burp sound", inline: false },
                    { name: "/sticky", value: "Plays sticky keys sound", inline: false },
                    { name: "/cabbagecat", value: "Plays cabbagecat sounds", inline: false },
                    { name: "/beans", value: "Plays beans sound", inline: false },
                    { name: "/dice", value: "Plays random dice number", inline: false },
                    { name: "/bassdrop", value: "Plays bassdrop sound", inline: false },
                    { name: "/dinosaur", value: "Plays dinosaur sound", inline: false },
                    { name: "/huh", value: "Plays hallmusic made by <@!161297999182430209>", inline: false },
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