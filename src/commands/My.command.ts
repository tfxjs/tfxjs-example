import { ChatCommand, ChatCommandExecution, Mess, TwitchChatMessage } from "twitch-bot-framework";

@ChatCommand({
    name: 'mycommand',
    keyword: 'my'
})
export default class MyCommand implements ChatCommandExecution {
    async execution(
        @Mess() message: TwitchChatMessage
    ) {
        message.reply('Hello, this is my command!');
    }
}