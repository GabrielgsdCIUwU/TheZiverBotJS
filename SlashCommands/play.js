const { SlashCommandBuilder } = require("discord.js");
const { playAudio, randomArray } = require("../Classes/functions.js");
const { sendErrorDC, logError } = require("../Classes/errorLogging.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Plays on sound in a voice channel")
        .addStringOption((option) =>
            option.setName("audio").setDescription("The audio you want to play.").setRequired(true).addChoices(
                {
                  name: "bassdrop",
                  value: "bassdrop.mp3"  
                },
                {
                  name: "beans",
                  value: "beansdrop.mp3"  
                },
                {
                  name: "burp",
                  value: "burp.wav"  
                },
                {
                  name: "cabbagecat",
                  value: "cabbagecat.mp3"  
                },
                {
                  name: "cheese",
                  value: "cheese.mp3"  
                },
                {
                  name: "dice",
                  value: "dice"  
                },
                {
                  name: "dinosaur",
                  value: "dinosaur.mp3"  
                },
                {
                  name: "huh",
                  value: "hall_music.mp3"  
                },
                {
                  name: "intro",
                  value: "intro.mp3"  
                },
                {
                  name: "sticky",
                  value: "stickykeys.mp3"  
                }
                
            )
        ),
    async run(interaction, client) {
        let sound = interaction.options.getString("audio");
        if (sound == "dice") {
            sound = randomArray("dice.json", "dice");
        }
        try {
            const channel = interaction.member.voice.channel;
            if (!channel) {
                return interaction.reply({
                    content: "You must be in a voice channel to use this command.",
                    ephemeral: true,
                });
            }

            playAudio(`${sound}`, interaction);
            await interaction.reply(`Playing ${sound}.`);
        } catch (error) {
            logError(error, `SC-${sound}`);
            sendErrorDC(client, interaction, `${sound}`, error);
            await interaction.reply({
                content: "Something went wrong, please contact an admin for help.",
                ephemeral: true,
            });
        }
    },
};