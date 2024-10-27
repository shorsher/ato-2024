import { start } from './app';

start().catch(err => {
  console.error('Error starting application', err);
  process.exit(1);
});