const { SlashCommandBuilder } = require("discord.js");
const { randomArray } = require("../Classes/functions.js");
const { sendErrorDC, logError } = require("../Classes/errorLogging.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("fish")
        .setDescription("Responds with a random fish gif"),
    async run(interaction, client) {
        try {
            const gif = randomArray("fish.json", "gifs");
            await interaction.reply(gif);
        } catch (error) {
            logError(error, "SC-fish");
            sendErrorDC(client, interaction, "fish", error);
            await interaction.reply({
                content: "Something went wrong, please contact an admin for help.",
                ephemeral: true,
            });
        }
    },
};