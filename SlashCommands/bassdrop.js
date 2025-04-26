const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");


const { playAudio } = require("../Classes/functions.js");

const { sendErrorDC, logError } = require("../Classes/errorLogging.js");
const { data } = require("./announcement.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("bassdrop")
    .setDescription("plays bassdrop sound in vc"),

    async run(message, args, client) {
        try {
            playAudio('bassdrop.mp3', message);
            message.reply("playing bassdrop");
        } catch(error) {
            logError(error, "SC-bassdrop")
            sendErrorDC(client, message, "bassdrop", error)
            message.reply("Something went wrong, please contact an admin for help.")
        }
    }

};