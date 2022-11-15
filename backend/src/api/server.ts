const port = process.env.PORT || 3001;
import app from './app';

app.listen(port, () => console.log(`Server listening on port ${port}`));
