import './LoadEnv';
import expressApp from './Server';
import logger from './shared/Logger';

const port = Number(process.env.PORT || 3000);
expressApp().listen(port, () => {
    logger.info('Express server started on port: ' + port);
});
