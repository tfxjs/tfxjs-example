import { TChannelOptions } from "twitch-bot-framework";

export type ChannelOptionsExtend = TChannelOptions<{
    additionalOption1: string;
    additionalOption2: number;
    additionalOption3: boolean;
    eXampleExecutionCounter: number; // Required for predefined ExampleCommand
}>;