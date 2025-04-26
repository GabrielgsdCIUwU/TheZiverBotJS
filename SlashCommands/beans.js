const { SlashCommandBuilder } = require("discord.js");
const { playAudio } = require("../Classes/functions.js");
const { sendErrorDC, logError } = require("../Classes/errorLogging.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("beans")
        .setDescription("Plays beans sound in a voice channel"),
    async run(interaction, client) {
        try {
            const channel = interaction.member.voice.channel;
            if (!channel) {
                return interaction.reply({
                    content: "You must be in a voice channel to use this command.",
                    ephemeral: true,
                });
            }

            playAudio("beansdrop.mp3", interaction);
            await interaction.reply("Playing beans.");
        } catch (error) {
            logError(error, "SC-beans");
            sendErrorDC(client, interaction, "beans", error);
            await interaction.reply({
                content: "Something went wrong, please contact an admin for help.",
                ephemeral: true,
            });
        }
    },
};