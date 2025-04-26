const { SlashCommandBuilder } = require("discord.js");
const { playAudio, randomArray } = require("../Classes/functions.js");
const { sendErrorDC, logError } = require("../Classes/errorLogging.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("dice")
        .setDescription("Plays a random dice sound in a voice channel"),
    async run(interaction, client) {
        try {
            const channel = interaction.member.voice.channel;
            if (!channel) {
                return interaction.reply({
                    content: "You must be in a voice channel to use this command.",
                    ephemeral: true,
                });
            }

            const diceSound = randomArray("dice.json", "dice");
            playAudio(diceSound, interaction);
            await interaction.reply("Playing dice.");
        } catch (error) {
            logError(error, "SC-dice");
            sendErrorDC(client, interaction, "dice", error);
            await interaction.reply({
                content: "Something went wrong, please contact an admin for help.",
                ephemeral: true,
            });
        }
    },
};