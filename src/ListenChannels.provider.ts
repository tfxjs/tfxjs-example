import { IListenChannelsProvider } from "twitch-bot-framework";

export default class ListenChannelsProvider implements IListenChannelsProvider {
    private channels: string[] = ['66250925', /* Insert Channel IDs here */];
    async getChannelIds(): Promise<string[]> {
        return this.channels;
    }
}