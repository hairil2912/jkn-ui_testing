import express from 'express';
import cors from 'cors';
import path from 'path';
import session from 'express-session';
import bcrypt from 'bcrypt';
import { fileURLToPath } from 'url';
import JKN from '../src/index.js';
import { configDB, Config, userDB } from './database.js';

// Extend session data type
declare module 'express-session' {
    interface SessionData {
        userId?: number;
        username?: string;
    }
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Session configuration
// Session configuration
// WARNING: Change SESSION_SECRET in production via environment variable!
app.use(session({
    secret: process.env.SESSION_SECRET || 'jkn-testing-secret-key-change-in-production-' + Math.random().toString(36),
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production', // HTTPS only in production
        httpOnly: true, // Prevent XSS attacks
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

app.use(cors({
    origin: true,
    credentials: true
}));
app.use(express.json());

// Authentication middleware
function requireAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.session && req.session.userId) {
        return next();
    }
    res.status(401).json({
        success: false,
        error: 'Unauthorized. Please login first.'
    });
}

// Public routes (login page)
app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Protect HTML pages - must be before express.static
app.get('/index.html', (req, res) => {
    if (req.session && req.session.userId) {
        return res.sendFile(path.join(__dirname, 'index.html'));
    }
    res.redirect('/login.html');
});

app.get('/config.html', (req, res) => {
    if (req.session && req.session.userId) {
        return res.sendFile(path.join(__dirname, 'config.html'));
    }
    res.redirect('/login.html');
});

// Serve static files (CSS, JS, images, etc.)
app.use(express.static(path.join(__dirname)));

// Login API
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                error: 'Username and password are required'
            });
        }
        
        const user = userDB.getByUsername(username);
        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'Invalid username or password'
            });
        }
        
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({
                success: false,
                error: 'Invalid username or password'
            });
        }
        
        // Set session
        req.session.userId = user.id;
        req.session.username = user.username;
        
        res.json({
            success: true,
            message: 'Login successful',
            user: {
                id: user.id,
                username: user.username
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

// Logout API
app.post('/api/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({
                success: false,
                error: 'Failed to logout'
            });
        }
        res.json({
            success: true,
            message: 'Logout successful'
        });
    });
});

// Check auth status
app.get('/api/auth/status', (req, res) => {
    if (req.session && req.session.userId) {
        res.json({
            success: true,
            authenticated: true,
            user: {
                id: req.session.userId,
                username: req.session.username
            }
        });
    } else {
        res.json({
            success: true,
            authenticated: false
        });
    }
});

// Protect all API routes except login, logout, and auth status
app.use('/api', (req, res, next) => {
    // Allow login, logout, and auth status endpoints
    if (req.path === '/login' || req.path === '/logout' || req.path === '/auth/status') {
        return next();
    }
    // Require auth for all other API endpoints
    requireAuth(req, res, next);
});

// Protect root path - redirect to login if not authenticated
app.get('/', (req, res) => {
    if (req.session && req.session.userId) {
        return res.redirect('/index.html');
    }
    res.redirect('/login.html');
});

// API endpoints for configuration management
// GET all configs
app.get('/api/configs', (req, res) => {
    try {
        const configs = configDB.getAll();
        res.json({
            success: true,
            data: configs
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

// GET config by ID
app.get('/api/configs/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid config ID'
            });
        }
        
        const config = configDB.getById(id);
        if (!config) {
            return res.status(404).json({
                success: false,
                error: 'Config not found'
            });
        }
        
        res.json({
            success: true,
            data: config
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

// POST create new config
app.post('/api/configs', (req, res) => {
    try {
        const config = req.body;
        
        // Validate required fields
        if (!config.namaRS || !config.mode || !config.ppkCode || !config.consId || 
            !config.consSecret || !config.vclaimUserKey || !config.antreanUserKey || !config.pcareUserKey) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields'
            });
        }
        
        const newConfig = configDB.create(config);
        res.json({
            success: true,
            data: newConfig
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

// PUT update config
app.put('/api/configs/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid config ID'
            });
        }
        
        const config = req.body;
        
        // Validate required fields
        if (!config.namaRS || !config.mode || !config.ppkCode || !config.consId || 
            !config.consSecret || !config.vclaimUserKey || !config.antreanUserKey || !config.pcareUserKey) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields'
            });
        }
        
        const updatedConfig = configDB.update(id, config);
        if (!updatedConfig) {
            return res.status(404).json({
                success: false,
                error: 'Config not found'
            });
        }
        
        res.json({
            success: true,
            data: updatedConfig
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

// DELETE config
app.delete('/api/configs/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid config ID'
            });
        }
        
        const deleted = configDB.delete(id);
        if (!deleted) {
            return res.status(404).json({
                success: false,
                error: 'Config not found'
            });
        }
        
        res.json({
            success: true,
            message: 'Config deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

// API endpoint untuk testing
app.post('/api/test', async (req, res) => {
    const startTime = Date.now();
    
    try {
        const { config, module, submodule, endpoint, params } = req.body;
        
        if (!config || !module || !endpoint) {
            return res.status(400).json({
                success: false,
                error: 'Missing required parameters'
            });
        }
        
        // Initialize JKN with config
        const jkn = new JKN({
            mode: config.mode || 'development',
            ppkCode: config.ppkCode,
            consId: config.consId,
            consSecret: config.consSecret,
            vclaimUserKey: config.vclaimUserKey,
            antreanUserKey: config.antreanUserKey,
            pcareUserKey: config.pcareUserKey,
            pcareUser: config.pcareUser,
            pcarePassword: config.pcarePassword,
            pcareKodeAplikasi: config.pcareKodeAplikasi,
            aplicaresUserKey: config.aplicaresUserKey || config.vclaimUserKey,
            apotekUserKey: config.apotekUserKey || config.vclaimUserKey,
            icareUserKey: config.icareUserKey || config.vclaimUserKey,
            rekamMedisUserKey: config.rekamMedisUserKey || config.vclaimUserKey
        });
        
        // Get the appropriate API instance
        let apiInstance: any;
        if (submodule) {
            apiInstance = (jkn as any)[module]?.[submodule];
        } else {
            apiInstance = (jkn as any)[module];
        }
        
        if (!apiInstance) {
            return res.status(400).json({
                success: false,
                error: `Module or submodule not found: ${module}${submodule ? '.' + submodule : ''}`
            });
        }
        
        // Get the endpoint method
        const method = apiInstance[endpoint];
        if (!method || typeof method !== 'function') {
            return res.status(400).json({
                success: false,
                error: `Endpoint not found: ${endpoint}`
            });
        }
        
        // Call the endpoint
        let result;
        if (Object.keys(params).length === 0) {
            result = await method.call(apiInstance);
        } else {
            result = await method.call(apiInstance, params);
        }
        
        const duration = Date.now() - startTime;
        
        res.json({
            success: true,
            data: result,
            duration
        });
        
    } catch (error) {
        const duration = Date.now() - startTime;
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({
            success: false,
            error: errorMessage,
            duration
        });
    }
});

// Bulk parameter API endpoint untuk testing satu endpoint dengan banyak parameter
app.post('/api/test-bulk-params', async (req, res) => {
    const startTime = Date.now();
    
    try {
        const { config, module, submodule, endpoint, params } = req.body;
        
        if (!config || !module || !endpoint || !Array.isArray(params)) {
            return res.status(400).json({
                success: false,
                error: 'Missing required parameters or params is not an array'
            });
        }
        
        // Initialize JKN with config
        const jkn = new JKN({
            mode: config.mode || 'development',
            ppkCode: config.ppkCode,
            consId: config.consId,
            consSecret: config.consSecret,
            vclaimUserKey: config.vclaimUserKey,
            antreanUserKey: config.antreanUserKey,
            pcareUserKey: config.pcareUserKey,
            pcareUser: config.pcareUser,
            pcarePassword: config.pcarePassword,
            pcareKodeAplikasi: config.pcareKodeAplikasi,
            aplicaresUserKey: config.aplicaresUserKey || config.vclaimUserKey,
            apotekUserKey: config.apotekUserKey || config.vclaimUserKey,
            icareUserKey: config.icareUserKey || config.vclaimUserKey,
            rekamMedisUserKey: config.rekamMedisUserKey || config.vclaimUserKey
        });
        
        // Get the appropriate API instance
        let apiInstance: any;
        if (submodule) {
            apiInstance = (jkn as any)[module]?.[submodule];
        } else {
            apiInstance = (jkn as any)[module];
        }
        
        if (!apiInstance) {
            return res.status(400).json({
                success: false,
                error: `Module or submodule not found: ${module}${submodule ? '.' + submodule : ''}`
            });
        }
        
        // Get the endpoint method
        const method = apiInstance[endpoint];
        if (!method || typeof method !== 'function') {
            return res.status(400).json({
                success: false,
                error: `Endpoint not found: ${endpoint}`
            });
        }
        
        // Process all parameter sets
        const results = await Promise.allSettled(
            params.map(async (paramSet: any) => {
                const reqStartTime = Date.now();
                try {
                    // Call the endpoint with this parameter set
                    const result = await method.call(apiInstance, paramSet);
                    const duration = Date.now() - reqStartTime;
                    return {
                        success: true,
                        result,
                        duration
                    };
                } catch (error) {
                    const duration = Date.now() - reqStartTime;
                    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
                    return {
                        success: false,
                        error: errorMessage,
                        duration
                    };
                }
            })
        );
        
        const totalDuration = Date.now() - startTime;
        const processedResults = results.map(r => r.status === 'fulfilled' ? r.value : {
            success: false,
            error: r.reason?.message || 'Unknown error',
            duration: 0
        });
        
        res.json({
            success: true,
            results: processedResults,
            totalDuration
        });
        
    } catch (error) {
        const duration = Date.now() - startTime;
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({
            success: false,
            error: errorMessage,
            duration
        });
    }
});

// Bulk API endpoint untuk testing multiple requests (legacy, bisa dihapus jika tidak digunakan)
app.post('/api/test-bulk', async (req, res) => {
    const startTime = Date.now();
    
    try {
        const { config, requests } = req.body;
        
        if (!config || !requests || !Array.isArray(requests)) {
            return res.status(400).json({
                success: false,
                error: 'Missing required parameters or requests is not an array'
            });
        }
        
        // Initialize JKN with config
        const jkn = new JKN({
            mode: config.mode || 'development',
            ppkCode: config.ppkCode,
            consId: config.consId,
            consSecret: config.consSecret,
            vclaimUserKey: config.vclaimUserKey,
            antreanUserKey: config.antreanUserKey,
            pcareUserKey: config.pcareUserKey,
            pcareUser: config.pcareUser,
            pcarePassword: config.pcarePassword,
            pcareKodeAplikasi: config.pcareKodeAplikasi,
            aplicaresUserKey: config.aplicaresUserKey || config.vclaimUserKey,
            apotekUserKey: config.apotekUserKey || config.vclaimUserKey,
            icareUserKey: config.icareUserKey || config.vclaimUserKey,
            rekamMedisUserKey: config.rekamMedisUserKey || config.vclaimUserKey
        });
        
        // Process all requests
        const results = await Promise.allSettled(
            requests.map(async (reqItem: any) => {
                const reqStartTime = Date.now();
                try {
                    const { module, submodule, endpoint, params = {} } = reqItem;
                    
                    if (!module || !endpoint) {
                        throw new Error('Missing module or endpoint');
                    }
                    
                    // Get the appropriate API instance
                    let apiInstance: any;
                    if (submodule) {
                        apiInstance = (jkn as any)[module]?.[submodule];
                    } else {
                        apiInstance = (jkn as any)[module];
                    }
                    
                    if (!apiInstance) {
                        throw new Error(`Module or submodule not found: ${module}${submodule ? '.' + submodule : ''}`);
                    }
                    
                    // Get the endpoint method
                    const method = apiInstance[endpoint];
                    if (!method || typeof method !== 'function') {
                        throw new Error(`Endpoint not found: ${endpoint}`);
                    }
                    
                    // Call the endpoint
                    let result;
                    if (Object.keys(params).length === 0) {
                        result = await method.call(apiInstance);
                    } else {
                        result = await method.call(apiInstance, params);
                    }
                    
                    const duration = Date.now() - reqStartTime;
                    return {
                        success: true,
                        module,
                        submodule,
                        endpoint,
                        result,
                        duration
                    };
                } catch (error) {
                    const duration = Date.now() - reqStartTime;
                    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
                    return {
                        success: false,
                        module: reqItem.module,
                        submodule: reqItem.submodule,
                        endpoint: reqItem.endpoint,
                        error: errorMessage,
                        duration
                    };
                }
            })
        );
        
        const totalDuration = Date.now() - startTime;
        const processedResults = results.map(r => r.status === 'fulfilled' ? r.value : {
            success: false,
            error: r.reason?.message || 'Unknown error',
            duration: 0
        });
        
        res.json({
            success: true,
            results: processedResults,
            totalDuration
        });
        
    } catch (error) {
        const duration = Date.now() - startTime;
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({
            success: false,
            error: errorMessage,
            duration
        });
    }
});

// Initialize default user if not exists
// NOTE: Change default password in production!
const DEFAULT_USERNAME = process.env.DEFAULT_USERNAME || 'khairil';
const DEFAULT_PASSWORD = process.env.DEFAULT_PASSWORD || 'password123';

const defaultUser = userDB.getByUsername(DEFAULT_USERNAME);
if (!defaultUser) {
    const hashedPassword = bcrypt.hashSync(DEFAULT_PASSWORD, 10);
    userDB.create(DEFAULT_USERNAME, hashedPassword);
    console.log(`✅ Default user "${DEFAULT_USERNAME}" created`);
    console.log(`⚠️  WARNING: Using default password! Change DEFAULT_PASSWORD environment variable in production!`);
}

app.listen(PORT, () => {
    console.log(`🚀 JKN Testing UI Server running on http://localhost:${PORT}`);
    console.log(`📝 Open http://localhost:${PORT} in your browser`);
    if (DEFAULT_PASSWORD === 'password123') {
        console.log(`🔐 Default login: username="${DEFAULT_USERNAME}", password="${DEFAULT_PASSWORD}"`);
        console.log(`⚠️  IMPORTANT: Change default password before deploying to production!`);
    }
});
