import { IListenChannelsProvider } from "@tfxjs/tfxjs";

export default class ListenChannelsProvider implements IListenChannelsProvider {
    private channels: string[] = ['87576158'];
    async getChannelIds(): Promise<string[]> {
        return this.channels;
    }

    getRefreshInterval(): number {
        return 1000 * 10;
    }
}