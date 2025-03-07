import "reflect-metadata";
import dotenv from 'dotenv';
import { APIRateLimiterModule, CacheModule, ChatBotModule, CommandsModule, InMemoryTokenRepository, ListenersModule, LogLevel, LogModule, TwitchBot } from "@tfxjs/tfxjs";
import ChannelOptionsProvider from "./ChannelOptions.provider";
import ListenChannelsProvider from "./ListenChannels.provider";
import MyCommand from "./commands/My.command";
import PrefixCommand from "./commands/Prefix.command";
import ShowMessageListener from "./listeners/ShowMessage.listener";
import PingCommand from "./commands/Ping.command";

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
            commands: [PingCommand, MyCommand, PrefixCommand],
        }),
        ListenersModule.forRoot({
            listeners: [ShowMessageListener],
        }),
        CacheModule.forRoot(),
        APIRateLimiterModule.forRoot(),
        LogModule.forRoot({
            levels: [
                LogLevel.NORMAL,
                LogLevel.INFO, 
                LogLevel.WARN, 
                LogLevel.ERROR, 
                // LogLevel.DEBUG, 
            ],
        })
    ],
})
class Bot {}

