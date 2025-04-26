const { SlashCommandBuilder } = require("discord.js");
const { randomArray } = require("../Classes/functions.js");
const { sendErrorDC, logError } = require("../Classes/errorLogging.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("schedule")
        .setDescription("Shows Ziver's upload schedule"),
    async run(interaction, client) {
        try {
            const schedule = randomArray("schedule.json", "ziverschedule");
            await interaction.reply(schedule);
        } catch (error) {
            logError(error, "SC-schedule");
            sendErrorDC(client, interaction, "schedule", error);
            await interaction.reply({
                content: "Something went wrong, please contact an admin for help.",
                ephemeral: true,
            });
        }
    },
};