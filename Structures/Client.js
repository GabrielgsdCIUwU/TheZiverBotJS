const { Client: DiscordClient, Collection, IntentsBitField, REST, Routes, Colors } = require("discord.js");
const fs = require("fs");
const colors = require("colors");

const Event = require("./Event.js");
const config = require("../Data/config.json");
const { refreshSlashCommands } = require("../Structures/SlashCommand.js");

const intents = new IntentsBitField(641);
colors.enable();

class Client extends DiscordClient {
    constructor() {
        super({ intents, allowedMentions: { repliedUser: false } });

        this.slashcommands = new Collection();
        this.prefix = config.prefix;
    }

    start(token) {
        fs.readdirSync("./Events")
            .filter(file => file.endsWith(".js"))
            .forEach(file => {
                const event = require(`../Events/${file}`);
                console.log(`Event ${event.event} loaded`);
                this.on(event.event, event.run.bind(null, this));
            });

        refreshSlashCommands();

        fs.readdirSync("./SlashCommands")
            .filter(file => file.endsWith(".js"))
            .forEach(file => {
                const command = require(`../SlashCommands/${file}`);

                if (!command || !command.data || !command.run) {
                    console.log(`❌ Invalid SlashCommand structure in file: ${file}`);
                    return;
                }

                console.log(`SlashCommand ${command.data.name} loaded`);
                this.slashcommands.set(command.data.name, command);
            });


        this.on('interactionCreate', async (interaction) => {
            if (!interaction.isChatInputCommand()) return;

            const command = this.slashcommands.get(interaction.commandName);

            if (!command) {
                return interaction.reply({ content: "Command not found.", ephemeral: true });
            }

            try {
                await command.run(interaction, this);
            } catch (error) {
                console.error(`Error running command ${interaction.commandName}:`, error);
                interaction.reply({ content: `There was an error running the command.`, ephemeral: true });
            }
        });

        this.login(token);
    }
}

module.exports = Client;
