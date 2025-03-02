import { ChatListener, ChatListenerExecution, ListenersModule, PartialTwitchUser, Sender, SenderData, TwitchUser, TwitchUserBroadcasterType } from "@tfxjs/tfxjs";

@ChatListener(ListenersModule.forFeature({
    name: 'Alert'
}))
export default class LogListener implements ChatListenerExecution {
    async execution(
        @SenderData() senderData: PartialTwitchUser,
        @Sender() sender: TwitchUser
    ): Promise<void> {
        const type = await sender.getBroadcasterType();
        if(type === TwitchUserBroadcasterType.Affiliate) {
            console.log(`Affiliate ${senderData.getUsername()} has sent a message`);
        }
    }
}