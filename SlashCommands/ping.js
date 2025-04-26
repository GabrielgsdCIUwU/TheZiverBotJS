const { SlashCommandBuilder } = require("discord.js");
const { randomArray } = require("../Classes/functions.js");
const { sendErrorDC, logError } = require("../Classes/errorLogging.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Pings Ziver in a specific channel"),
    async run(interaction, client) {
        try {
            const channel = await client.channels.fetch("897144218571653150");
            const pingMessage = randomArray("pings.json", "pings");
            await channel.send(pingMessage);
            await interaction.reply("Pinged Ziver :D");
        } catch (error) {
            logError(error, "SC-ping");
            sendErrorDC(client, interaction, "ping", error);
            await interaction.reply({
                content: "Something went wrong, please contact an admin for help.",
                ephemeral: true,
            });
        }
    },
};