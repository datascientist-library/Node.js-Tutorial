const logger = require('./logger');

logger.info('Server started on port 3000');
logger.warn('Memory usage is getting high');
logger.error('Database connection failed');
logger.debug('This will NOT show (below min level)');
logger.info({ userId: 42, action: 'login' }, 'User logged in');


// OUTPUT

// [21:36:48.397] INFO (25516): Server started on port 3000
// [21:36:48.400] WARN (25516): Memory usage is getting high
// [21:36:48.400] ERROR (25516): Database connection failed
// [21:36:48.400] INFO (25516): User logged in
//     userId: 42
//     action: "login"