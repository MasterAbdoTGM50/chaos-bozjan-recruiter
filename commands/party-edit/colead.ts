import { Command } from "../../handlers/command";
import { Bot } from "../../bot";
import { Message } from "discord.js";
import { updatePartyMsg } from "../../party/party-utils";

import { lRole, hRole, emojis } from "../../guild.json";

export = class ColeadCommand extends Command {

    aliases: string[] = ["colead"];
    roles: string[] = [lRole, hRole];

    async handle(bot: Bot, message: Message, args: string[]) {
        if(args.length >= 1) {
            const party = bot.parties.all().find(party => party.id === args[0]);
            if(party !== undefined) {
                party.coleader = { id: message.author.id, name: bot.guild.member(message.author).displayName }
                updatePartyMsg(bot, party);
                message.react(`<:${emojis.confirm}>`).then();
                return;
            }
        }
        message.react(`<:${emojis.error}>`).then();
    }

}