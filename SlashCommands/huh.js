const { SlashCommandBuilder } = require("discord.js");
const { playAudio } = require("../Classes/functions.js");
const { sendErrorDC, logError } = require("../Classes/errorLogging.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("huh")
        .setDescription("Plays the hall music sound in a voice channel"),
    async run(interaction, client) {
        try {
            const channel = interaction.member.voice.channel;
            if (!channel) {
                return interaction.reply({
                    content: "You must be in a voice channel to use this command.",
                    ephemeral: true,
                });
            }

            playAudio("hall_music.mp3", interaction);
            await interaction.reply("Playing huh?");
        } catch (error) {
            logError(error, "SC-huh");
            sendErrorDC(client, interaction, "huh", error);
            await interaction.reply({
                content: "Something went wrong, please contact an admin for help.",
                ephemeral: true,
            });
        }
    },
};