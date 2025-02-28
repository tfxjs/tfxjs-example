# Twitch Bot Framework Preview

## 📌 Description
This repository demonstrates the functionality of the [Twitch Bot Framework package](https://www.npmjs.com/package/twitch-bot-framework). You can clone this repo and run using Docker.

---

## 🚀 How to Run the Project Locally?

### 1️⃣ Requirements
- [Docker & Docker Compose](https://www.docker.com/)

---

## 🐳 Running with Docker Compose

### 1️⃣ Create a `.env` File 
In the root directory of the repository, create a `.env` file and fill it with your credentials:

```
CLIENT_ID=your_client_id
CLIENT_SECRET=your_client_secret
USER_ID=your_user_id
USER_REFRESH_TOKEN=your_refresh_token
```

### 2️⃣ Build and Run the Container
```sh
docker-compose up --build
```

The bot will be started inside a container. You can use docker-compose along with `-d` to run the container in the background.

### 3️⃣ Check Logs
```sh
docker logs -f twitch-bot
```

### 4️⃣ Stop the Container
```sh
docker-compose down
```

---

## How to add command / listener?

By default, 2 commands and 1 listener are enabled: `PingCommand` (example command from package), custom `MyCommand` and `ChatLogListener`. For the command to work it is required to decorate it with the `@ChatCommand` decorator and to write the command class to the `TwitchBotFramework` config.

```typescript
@ChatCommand({
    name: 'mycommand',
    keyword: 'my'
})
export default class MyCommand implements ChatCommandExecution {
    //...
}
```

```typescript
const app = new TwitchBotFramework({
    //...
    chat: {
        commands: [/*...*/ MyCommand /*...*/],
        listeners: [/*...*/]
    }
    //...
});
```

Similarly if you want to add a listener:

```typescript
@ChatListener({
    name: 'chatlog'
})
export default class ChatLogListener implements ChatListenerExecution {
    //...
}
```

```typescript
const app = new TwitchBotFramework({
    //...
    chat: {
        commands: [/*...*/],
        listeners: [/*...*/ ChatLogListener /*...*/]
    }
    //...
});
```