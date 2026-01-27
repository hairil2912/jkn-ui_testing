import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database file path
const DB_PATH = path.join(__dirname, 'config.db');

// Initialize database
const db = new Database(DB_PATH);

// Create table if not exists
db.exec(`
    CREATE TABLE IF NOT EXISTS configs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        namaRS TEXT NOT NULL,
        mode TEXT NOT NULL,
        ppkCode TEXT NOT NULL,
        consId TEXT NOT NULL,
        consSecret TEXT NOT NULL,
        vclaimUserKey TEXT NOT NULL,
        antreanUserKey TEXT NOT NULL,
        pcareUserKey TEXT NOT NULL,
        pcareUser TEXT,
        pcarePassword TEXT,
        pcareKodeAplikasi TEXT,
        aplicaresUserKey TEXT,
        apotekUserKey TEXT,
        icareUserKey TEXT,
        rekamMedisUserKey TEXT,
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
    )
`);

// Migration: Add pcare auth fields if they don't exist
// SQLite doesn't support IF NOT EXISTS for ALTER TABLE, so we check manually
try {
    const tableInfo = db.prepare("PRAGMA table_info(configs)").all() as Array<{ name: string }>;
    const existingColumns = new Set(tableInfo.map(col => col.name));

    if (!existingColumns.has('pcareUser')) {
        db.exec('ALTER TABLE configs ADD COLUMN pcareUser TEXT');
    }
    if (!existingColumns.has('pcarePassword')) {
        db.exec('ALTER TABLE configs ADD COLUMN pcarePassword TEXT');
    }
    if (!existingColumns.has('pcareKodeAplikasi')) {
        db.exec('ALTER TABLE configs ADD COLUMN pcareKodeAplikasi TEXT');
    }
} catch (error) {
    // Migration failed, but continue - columns might already exist or table doesn't exist yet
    console.warn('Migration warning:', error instanceof Error ? error.message : 'Unknown error');
}

// Create users table for authentication
db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP
    )
`);

// Prepared statements
const stmts = {
    getAll: db.prepare('SELECT * FROM configs ORDER BY createdAt DESC'),
    getById: db.prepare('SELECT * FROM configs WHERE id = ?'),
    insert: db.prepare(`
        INSERT INTO configs (
            namaRS, mode, ppkCode, consId, consSecret,
            vclaimUserKey, antreanUserKey, pcareUserKey,
            pcareUser, pcarePassword, pcareKodeAplikasi,
            aplicaresUserKey, apotekUserKey, icareUserKey, rekamMedisUserKey
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `),
    update: db.prepare(`
        UPDATE configs SET
            namaRS = ?, mode = ?, ppkCode = ?, consId = ?, consSecret = ?,
            vclaimUserKey = ?, antreanUserKey = ?, pcareUserKey = ?,
            pcareUser = ?, pcarePassword = ?, pcareKodeAplikasi = ?,
            aplicaresUserKey = ?, apotekUserKey = ?, icareUserKey = ?, rekamMedisUserKey = ?,
            updatedAt = CURRENT_TIMESTAMP
        WHERE id = ?
    `),
    delete: db.prepare('DELETE FROM configs WHERE id = ?'),
    // User statements
    getUserByUsername: db.prepare('SELECT * FROM users WHERE username = ?'),
    createUser: db.prepare('INSERT INTO users (username, password) VALUES (?, ?)')
};

export interface Config {
    id?: number;
    namaRS: string;
    mode: 'development' | 'production';
    ppkCode: string;
    consId: string;
    consSecret: string;
    vclaimUserKey: string;
    antreanUserKey: string;
    pcareUserKey: string;
    pcareUser?: string;
    pcarePassword?: string;
    pcareKodeAplikasi?: string;
    aplicaresUserKey?: string;
    apotekUserKey?: string;
    icareUserKey?: string;
    rekamMedisUserKey?: string;
    createdAt?: string;
    updatedAt?: string;
}

export const configDB = {
    getAll(): Config[] {
        return stmts.getAll.all() as Config[];
    },
    
    getById(id: number): Config | null {
        const result = stmts.getById.get(id) as Config | undefined;
        return result || null;
    },
    
    create(config: Omit<Config, 'id' | 'createdAt' | 'updatedAt'>): Config {
        const result = stmts.insert.run(
            config.namaRS,
            config.mode,
            config.ppkCode,
            config.consId,
            config.consSecret,
            config.vclaimUserKey,
            config.antreanUserKey,
            config.pcareUserKey,
            config.pcareUser || null,
            config.pcarePassword || null,
            config.pcareKodeAplikasi || null,
            config.aplicaresUserKey || null,
            config.apotekUserKey || null,
            config.icareUserKey || null,
            config.rekamMedisUserKey || null
        );
        
        const newConfig = this.getById(result.lastInsertRowid as number);
        if (!newConfig) {
            throw new Error('Failed to create config');
        }
        return newConfig;
    },
    
    update(id: number, config: Omit<Config, 'id' | 'createdAt' | 'updatedAt'>): Config | null {
        stmts.update.run(
            config.namaRS,
            config.mode,
            config.ppkCode,
            config.consId,
            config.consSecret,
            config.vclaimUserKey,
            config.antreanUserKey,
            config.pcareUserKey,
            config.pcareUser || null,
            config.pcarePassword || null,
            config.pcareKodeAplikasi || null,
            config.aplicaresUserKey || null,
            config.apotekUserKey || null,
            config.icareUserKey || null,
            config.rekamMedisUserKey || null,
            id
        );
        
        return this.getById(id);
    },
    
    delete(id: number): boolean {
        const result = stmts.delete.run(id);
        return result.changes > 0;
    }
};

export interface User {
    id?: number;
    username: string;
    password: string;
    createdAt?: string;
}

export const userDB = {
    getByUsername(username: string): User | null {
        const result = stmts.getUserByUsername.get(username) as User | undefined;
        return result || null;
    },
    
    create(username: string, hashedPassword: string): User {
        stmts.createUser.run(username, hashedPassword);
        const user = this.getByUsername(username);
        if (!user) {
            throw new Error('Failed to create user');
        }
        return user;
    }
};

// Close database on process exit
process.on('exit', () => db.close());
process.on('SIGINT', () => {
    db.close();
    process.exit(0);
});
