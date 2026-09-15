import {registerCtrl} from '../src/controllers/auth.controller.js';

test('User should be register', async ()=>{
    const req = {
        body: {
            username: "Ashish",
            email: "iamashishtiwari203@gmail.com",
            password: "ashish123"
        }
    };

    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };

    const next = jest.fn();

    await registerCtrl(req,res,next);

    expect(res.status).toHaveBeenCalledWith(201);

    expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
            message: "User created!",
            success: true
        })
    )
})