const { SlashCommandBuilder } = require("discord.js");
const { randomArray } = require("../Classes/functions.js");
const { sendErrorDC, logError } = require("../Classes/errorLogging.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("spin")
        .setDescription("Responds with a random spinny gif"),
    async run(interaction, client) {
        try {
            const gif = randomArray("spinny.json", "gifs");
            await interaction.reply(gif);
        } catch (error) {
            logError(error, "SC-spin");
            sendErrorDC(client, interaction, "spin", error);
            await interaction.reply({
                content: "Something went wrong, please contact an admin for help.",
                ephemeral: true,
            });
        }
    },
};