const { SlashCommandBuilder, WebhookClient, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const fs = require("fs");
const path = require("path");
const { fileURLToPath } = require("url");
const { createGroupPost } = require("../Classes/vrchat");

const config = require("../Data/config.json");


module.exports = {
    data: new SlashCommandBuilder()
        .setName("announcement")
        .setDescription("Manage announcements")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand((subcommand) =>
            subcommand
                .setName("create")
                .setDescription("Create a new announcement")
                .addStringOption((option) =>
                    option.setName("title").setDescription("The title").setRequired(true)
                )
                .addStringOption((option) =>
                    option.setName("text").setDescription("The message").setRequired(true)
                )
                .addBooleanOption((option) =>
                    option.setName("ping").setDescription("Ping @everyone").setRequired(true)
                )
                .addStringOption((option) =>
                    option.setName("image").setDescription("Image URL").setRequired(false)
                )
                .addStringOption((option) =>
                    option.setName("group").setDescription("Group ID").setRequired(false)
                )
        )
        .addSubcommand((subcommand) =>
            subcommand.setName("view").setDescription("View the latest announcement")
        ),
    async run(interaction, client) {
        const subcommand = interaction.options.getSubcommand();
        const announFilePath = path.join(__dirname, "../Data/announcement.json");

        if (subcommand === "create") {
            const title = interaction.options.getString("title");
            const text = interaction.options.getString("text");
            const ping = interaction.options.getBoolean("ping");
            const image = interaction.options.getString("image");
            const group = interaction.options.getString("group") || config.defaultGroupID;

            let announcement = {
                title,
                message: text,
                timestamp: Date.now(),
                by: interaction.user
            };

            try {
                fs.writeFileSync(announFilePath, JSON.stringify(announcement, null, 2), "utf-8");
            } catch (error) {
                return interaction.reply({
                    content: "Error writing announcement file.",
                    ephemeral: true,
                });
            }

            const webhook = new WebhookClient({ url: config.webhook });
            const embed = new EmbedBuilder()
                .setTitle(title)
                .setDescription(text)
                .setTimestamp()
                .setThumbnail(image || null)
                .setColor(config.color)
                .setFooter({ text: `Announcement by: ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() });

            try {
                if (ping) {
                    await webhook.send({ content: "@everyone", embeds: [embed] });
                } else {
                    await webhook.send({ embeds: [embed] });
                }

                await interaction.reply({
                    content: `Announcement sent ${ping ? "with" : "without"} @everyone.`,
                    ephemeral: true,
                });

                createGroupPost(client, group, title, text, ping)
            } catch (error) {
                console.error("Error sending announcement:", error);
                await interaction.reply({
                    content: "There was an error sending the announcement.",
                    ephemeral: true,
                });
            }

        } else if (subcommand === "view") {
            let announcement;

            try {
                const data = fs.readFileSync(announFilePath, "utf-8");
                announcement = JSON.parse(data);
            } catch (error) {
                return interaction.reply({
                    content: "Error loading or parsing announcement file.",
                    ephemeral: true,
                });
            }

            const embed = new EmbedBuilder()
                .setTitle(announcement.title)
                .setDescription(announcement.message)
                .setTimestamp(announcement.timestamp)
                .setColor("#f57f17")
                .setFooter({ text: `Announcement by: ${announcement.by}`, iconURL: client.user.displayAvatarURL() });

            await interaction.reply({ embeds: [embed], ephemeral: true });
        }
    }
};