import "reflect-metadata";
import dotenv from 'dotenv';
import { ExampleCommand, InMemoryTokenRepository, LogLevel, PingCommand, ShowMessageListener, TwitchBot } from 'twitch-bot-framework';
import ListenChannelsProvider from "./ListenChannels.provider";
import ChannelOptionsProvider from "./ChannelOptions.provider";
import PrefixCommand from "./commands/Prefix.command";
import LogListener from "./listeners/ChatLog.listener";

dotenv.config();

const clientId = process.env.CLIENT_ID as string;
const clientSecret = process.env.CLIENT_SECRET as string;
const userId = process.env.USER_ID as string;
const userRefreshToken = process.env.USER_REFRESH_TOKEN as string;

@TwitchBot({
    userId,
    clientId,
    clientSecret,
    listenChannels: {
        provider: ListenChannelsProvider,
        refreshInterval: 30000,
    },
    channelOptions: {
        provider: ChannelOptionsProvider,
    },
    tokenRepository: InMemoryTokenRepository,
    commands: [PingCommand, PrefixCommand, ExampleCommand],
    listeners: [ShowMessageListener, LogListener],
    log: {
        levels: [LogLevel.INFO, LogLevel.NORMAL, LogLevel.ERROR, LogLevel.WARN] //, LogLevel.DEBUG],
    },
})
class Bot {}
