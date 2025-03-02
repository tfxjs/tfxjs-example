import { IChannelOptionsProvider } from "@tfxjs/tfxjs";
import { ChannelOptionsExtend } from "./types";

export default class ChannelOptionsProvider implements IChannelOptionsProvider<ChannelOptionsExtend> {
    private readonly baseOptions: ChannelOptionsExtend = {
        prefix: '!',
        eXampleExecutionCounter: 0,
        additionalOption1: 'default',
        additionalOption2: 0,
        additionalOption3: false,
    };
    private readonly changedOptions = new Map<string, ChannelOptionsExtend>();

    async getOptions(channelId: string): Promise<ChannelOptionsExtend> {
        if (this.changedOptions.has(channelId)) {
            return this.changedOptions.get(channelId) as ChannelOptionsExtend;
        }
        return this.baseOptions;
    }

    async setOptions(channelId: string, options: ChannelOptionsExtend): Promise<void> {
        this.changedOptions.set(channelId, options);
    }
}