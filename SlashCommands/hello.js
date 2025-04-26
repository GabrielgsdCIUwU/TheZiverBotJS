const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("hello")
        .setDescription("Says hello"),
    async run(interaction, client) {
        await interaction.reply("Hello there random person from the internet.");
    },
};