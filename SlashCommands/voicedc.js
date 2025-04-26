const { SlashCommandBuilder } = require("discord.js");
const { stopAudio } = require("../Classes/functions.js");
const { sendErrorDC, logError } = require("../Classes/errorLogging.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("voicedc")
        .setDescription("Stops playing audio in the voice channel"),
    async run(interaction, client) {
        try {
            stopAudio(interaction);
            await interaction.reply("Stopped audio.");
        } catch (error) {
            logError(error, "SC-voicedc");
            sendErrorDC(client, interaction, "voicedc", error);
            await interaction.reply({
                content: "Something went wrong, please contact an admin for help.",
                ephemeral: true,
            });
        }
    },
};