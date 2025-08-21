const { RateLimiterMemory } = require('rate-limiter-flexible');

// Rate limiters for different endpoints
const rateLimiters = {
  // General API rate limiter
  general: new RateLimiterMemory({
    points: 100, // Number of requests
    duration: 60, // Per 60 seconds
  }),
  
  // Auth endpoints (more restrictive)
  auth: new RateLimiterMemory({
    points: 10, // 10 requests
    duration: 60, // Per 60 seconds
  }),
  
  // Message sending
  messages: new RateLimiterMemory({
    points: 50, // 50 messages
    duration: 60, // Per 60 seconds
  }),
  
  // Key exchange (very restrictive)
  keyExchange: new RateLimiterMemory({
    points: 5, // 5 requests
    duration: 60, // Per 60 seconds
  })
};

const createRateLimitMiddleware = (limiterType = 'general') => {
  return async (req, res, next) => {
    const limiter = rateLimiters[limiterType];
    const key = req.ip || 'unknown';
    
    try {
      await limiter.consume(key);
      next();
    } catch (rejRes) {
      const secs = Math.round(rejRes.msBeforeNext / 1000) || 1;
      res.set('Retry-After', String(secs));
      res.status(429).json({
        error: 'Too many requests',
        retryAfter: secs
      });
    }
  };
};

// Default middleware uses general rate limiter
module.exports = createRateLimitMiddleware();
module.exports.auth = createRateLimitMiddleware('auth');
module.exports.messages = createRateLimitMiddleware('messages');
module.exports.keyExchange = createRateLimitMiddleware('keyExchange');
