const request = require('supertest')
const app = require('../app')

const testRegister = async () => {
    const user = {
        "username": "TestUser",
        "password": "TestPassword"
    };
    const res = await request(app).post('/api/register').send(user);
    expect(res.statusCode).toBe(201);
    expect(res.text).toBe('{\"message\":\"Registered!\"}');
};

const testLogin = async () => {
    const user = {
        "username": "TestUser",
        "password": "TestPassword"
    };
    const res = await request(app).post('/api/login').send(user);
    expect(res.statusCode).toBe(200);

    const body = JSON.parse(res.text);
    expect(body["token"]).not.toBe(undefined);
    return body["token"];
};

describe('API endpoints', () => {
    it('should register a user successfully', async() => {
        await testRegister();
    });
    
    it('should register a user and login successfully', async () => {
        await testRegister();
        await testLogin();
    });
    
    it('should get profile for authenticated request', async () => {
        await testRegister();
        const token = await testLogin();
        const res = await request(app).get('/api/profile').set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        
        const body = JSON.parse(res.text);
        expect(body["user"]).not.toBe(undefined);
        expect(body["user"].username).toBe("TestUser");
    });

    it('should not get profile for missing auth token', async () => {
        const res = await request(app).get('/api/profile');
        expect(res.statusCode).toBe(401);
        expect(JSON.parse(res.text).error).toBe("Missing auth token");
    });
    
    it('should not get profile for invalid auth token', async () => {
        const res = await request(app).get('/api/profile').set('Authorization', 'Bearer garbage');
        expect(res.statusCode).toBe(403);
        expect(JSON.parse(res.text).error).toBe("Invalid auth token");
    });
    
    it('should not get profile for non-Bearer auth token', async () => {
        await testRegister();
        const token = await testLogin();
        const res = await request(app).get('/api/profile').set('Authorization', token);
        expect(res.statusCode).toBe(401);
        expect(JSON.parse(res.text).error).toBe("Missing auth token");
    });
});
