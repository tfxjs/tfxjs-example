import { ChannelOptionsProvider, ChatCommand, ChatCommandExecution, ChatCommandExecutionGuard, ChatCommandExecutionGuardAvaliableResults, ChatterUser, Mess, MessageUser, OptionsProvider, TwitchChatMessage } from "twitch-bot-framework";

@ChatCommand({
    name: 'ChangePrefixCommand',
    keyword: 'prefix'
})
export default class PrefixCommand implements ChatCommandExecution, ChatCommandExecutionGuard {
    guard(
        @MessageUser() chatter: ChatterUser,
    ): ChatCommandExecutionGuardAvaliableResults {
        if (chatter.isBroadcaster() || chatter.isModerator()) return { canAccess: true };
        return { canAccess: false, message: 'You do not have permission to execute this command'};
    }

    async execution(
        @OptionsProvider() options: ChannelOptionsProvider,
        @Mess() message: TwitchChatMessage
    ) {
        console.log('ChangePrefixCommand executed');
        const messageContent = message.getText();
        const newPrefix = messageContent.split(' ')[1];
        if (!newPrefix) {
            message.reply('You need to specify a prefix');
            return;
        }
        message.reply(`Prefix changed to ${newPrefix}`);
        options.setChannelOptions(message.getBroadcasterId(), {
            ...options,
            prefix: newPrefix
        })
    }
}