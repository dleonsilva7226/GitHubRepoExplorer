import { PrismaClient } from '@prisma/client';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { Request, Response, NextFunction } from 'express';
import { registerUser } from '../controllers/registerUser';

describe('Auth Controller Tests', () => {
    let mockPrisma: DeepMockProxy<PrismaClient>;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        mockPrisma = mockDeep<PrismaClient>();
        mockRequest = {
            body: {
                email: 'test@example.com',
                password: 'password123'
            }
        };
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        mockNext = jest.fn();
    });

    it('should register a new user successfully', async () => {
        const mockUser = {
            id: 1,
            email: 'test@example.com',
            password: 'hashedPassword'
        };

        mockPrisma.user.findUnique.mockResolvedValue(null);
        mockPrisma.user.create.mockResolvedValue(mockUser);

        await registerUser(
            mockRequest as Request, 
            mockResponse as Response, 
            mockNext,
            mockPrisma
        );

        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith(
            expect.objectContaining({
                success: true,
                message: "User registered successfully"
            })
        );
    });
});