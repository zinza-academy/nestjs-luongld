import 'dotenv/config';
import { CommandFactory } from 'nest-commander';
import { AppModule } from './app.module';

async function bootstrap() {
  await CommandFactory.run(AppModule, ['warn', 'error']);
}

bootstrap()
  .then(async () => {
    console.info('\ncommand bootstrapped ...!');
    process.exit(0);
  })
  .catch((err) => {
    console.error(`server failed to start command`, err);
    process.exit(1);
  });
