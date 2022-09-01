import * as express from 'express';
import 'express-async-errors';
import * as swaggerUi from 'swagger-ui-express';
import usersrRouter from './routers/usersRouter';
import teamsRouter from './routers/teamsRouter';
import matchesRouter from './routers/matchesRouter';
import leaderBoardRouter from './routers/leaderBoardRouter';
import errorHandler from './middlewares/ErrorMiddleware';
import * as swaggerFile from './swagger-output.json';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);

    this.app.use(usersrRouter);
    this.app.use(teamsRouter);
    this.app.use(matchesRouter);
    this.app.use(leaderBoardRouter);
    this.app.use(errorHandler);
    this.app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

export const { app } = new App();
