import { ChatCommand, ChatCommandExecution, CommandsModule, Mess, TwitchChatMessage } from "@tfxjs/tfxjs";

@ChatCommand(CommandsModule.forFeature({
    name: 'my',
    keyword: 'my',
}))
export default class MyCommand implements ChatCommandExecution {
    async execution(
        @Mess() message: TwitchChatMessage
    ) {
        message.reply('Hello, this is my command!');
    }
}