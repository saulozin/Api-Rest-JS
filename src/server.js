import app from './app';

const port = process.env.APP_PORT;
const url = process.env.APP_URL;

app.listen(port, () => {
  console.log();
  console.log(`Escutando na porta ${port}`);
  console.log(`CTRL + Clique em ${url}:${port}`);
});
