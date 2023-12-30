// Em server.js ou index.js
import express from 'express';
import cors from 'cors';

import config from './config.js';
import chatRoute from './routes/chatRoute.js';
// import userRoute from './routes/userRoute.js';
// import messageRoute from './routes/messageRoute.js';
// import audioRoute from './routes/audioRoute.js';

const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/chats', chatRoute);
// app.use('/api/users', userRoute);
// app.use('/api/messages', messageRoute);
// app.use('/api/audios', audioRoute);

app.listen(config.port, () =>
  console.log(`Server is live @ ${config.hostUrl}`),
);
