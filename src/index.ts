import "reflect-metadata";
import dotenv from 'dotenv';
import { APIRateLimiterModule, CacheModule, ChatBotModule, CommandsModule, CounterListener, ExampleCommand, InMemoryTokenRepository, ListenersModule, LogLevel, PingCommand, ShowMessageListener, TwitchBot } from "@tfxjs/tfxjs";
import ChannelOptionsProvider from "./ChannelOptions.provider";
import ListenChannelsProvider from "./ListenChannels.provider";
import MyCommand from "./commands/My.command";
import PrefixCommand from "./commands/Prefix.command";
import LogListener from "./listeners/ChatLog.listener";

dotenv.config();

const clientId = process.env.CLIENT_ID as string;
const clientSecret = process.env.CLIENT_SECRET as string;
const userId = process.env.USER_ID as string;
const userRefreshToken = process.env.USER_REFRESH_TOKEN as string;

@TwitchBot({
    client: {
        id: clientId,
        secret: clientSecret,
    },
    userId: userId,
    modules: [
        ChatBotModule.forRoot({
            listenChannels: { useClass: ListenChannelsProvider },
            channelOptions: { useClass: ChannelOptionsProvider },
            tokenRepository: { useValue: new InMemoryTokenRepository(userId, userRefreshToken) },
        }),
        CommandsModule.forRoot({
            commands: [PingCommand, ExampleCommand, MyCommand, PrefixCommand],
        }),
        ListenersModule.forRoot({
            listeners: [CounterListener, ShowMessageListener, LogListener],
        }),
        CacheModule.forRoot(),
        APIRateLimiterModule.forRoot(),
    ],
    log: {
        levels: [LogLevel.INFO, LogLevel.NORMAL, LogLevel.ERROR, LogLevel.WARN, LogLevel.DEBUG],
    },
})
class Bot {}

