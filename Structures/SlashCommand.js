const { REST, Routes } = require('discord.js');
const fs = require('fs');
const config = require('../Data/config.json');

async function deleteSlashCommands(rest) {
    try {
        console.log('Deleting existing slash commands...');
        await rest.put(Routes.applicationGuildCommands(config.clientId, config.guildId), {
            body: []
        });
        console.log('Successfully deleted existing slash commands.');
    } catch (error) {
        console.error(`Error deleting commands: ${error}`);
    }
}

async function registerSlashCommands(rest, slashCommandsData) {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationGuildCommands(config.clientId, config.guildId), {
            body: slashCommandsData
        });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(`Error refreshing commands: ${error}`);
    }
}

async function loadSlashCommands() {
    const slashCommandsData = [];

    fs.readdirSync("./SlashCommands")
        .filter(file => file.endsWith(".js"))
        .forEach(file => {
            const command = require(`../SlashCommands/${file}`);

            if (!command || !command.data || !command.run) {
                console.log(`❌ Invalid SlashCommand structure in file: ${file}`);
                return;
            }

            console.log(`SlashCommand ${command.data.name} loaded`);
            slashCommandsData.push(command.data.toJSON());
        });

    return slashCommandsData;
}

async function refreshSlashCommands() {
    const rest = new REST({ version: '10' }).setToken(config.token);

    const slashCommandsData = await loadSlashCommands();
    await deleteSlashCommands(rest);
    await registerSlashCommands(rest, slashCommandsData);
}

module.exports = { refreshSlashCommands, loadSlashCommands };
