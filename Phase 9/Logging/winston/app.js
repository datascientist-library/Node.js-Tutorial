const logger = require('./logger');

logger.info('Server started on port 3000');
logger.warn('Memory usage is getting high');
logger.error('Database connection failed');
logger.debug('This will NOT show (below min level)');
logger.info('User Alice logged in');


// OUTPUT

// [2026-06-25T16:00:36.765Z] INFO: Server started on port 3000
// [2026-06-25T16:00:36.771Z] WARN: Memory usage is getting high
// [2026-06-25T16:00:36.772Z] ERROR: Database connection failed
// [2026-06-25T16:00:36.773Z] INFO: User Alice logged in