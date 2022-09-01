const swaggerAutogen = require('swagger-autogen')();

const outputFile = 'src/swagger-output.json';
const endpointsFiles = [
  'src/routers/leaderBoardRouter.ts', 
  'src/routers/matchesRouter.ts',
  'src/routers/teamsRouter.ts',
  'src/routers/usersRouter.ts',
];

swaggerAutogen(outputFile, endpointsFiles);
