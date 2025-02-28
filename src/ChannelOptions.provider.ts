import { IChannelOptionsProvider } from "twitch-bot-framework";
import { ChannelOptionsExtend } from "./types";

export default class ChannelOptionsProvider implements IChannelOptionsProvider<ChannelOptionsExtend> {
    private readonly baseOptions: ChannelOptionsExtend = {
        prefix: '!',
        additionalOption1: 'test',
        additionalOption2: 123,
        additionalOption3: true,
        eXampleExecutionCounter: 0
    }
    private readonly changedOptions = new Map<string, ChannelOptionsExtend>();

    async getOptions(channelId: string): Promise<ChannelOptionsExtend> {
        if(this.changedOptions.has(channelId)) {
            return this.changedOptions.get(channelId) as ChannelOptionsExtend;
        }
        return this.baseOptions;
    }

    async setOptions(channelId: string, options: ChannelOptionsExtend): Promise<void> {
        this.changedOptions.set(channelId, options);
    }
}