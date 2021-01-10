import {Worker} from 'worker_threads';
import sirv from 'sirv';
import polka, { Middleware } from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import getLog from './common/log';
import {confApp} from './common/conf';
const log = getLog('APP');
const { NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';
new Worker(`${__dirname}/mutProvider.js`);


const logging:Middleware = (req, res, next) => {
	log.verbose(`Request: ${req.url}`);
	next();
}

polka()
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		logging,
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
		sapper.middleware()
	)
	.listen(confApp.port, err => {
		if (err) {
			// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
			log.error(`Error: ${err}`);
		} else {
			log.info(`Starting server  localhost:${confApp.port}`);
		}
	});
