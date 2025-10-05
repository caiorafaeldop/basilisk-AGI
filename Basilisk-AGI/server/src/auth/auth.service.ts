import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MongoAdapter } from 'src/prisma/mongo.adapter';
import { PasswordUtil } from 'src/utils/password.util';
import { JwtAuthService } from './jwt.service';

@Injectable()
export class AuthService {
  private mongoAdapter: MongoAdapter;

  constructor(
    private prisma: PrismaService,
    private jwtAuthService: JwtAuthService,
  ) {
    this.mongoAdapter = new MongoAdapter(prisma);
  }

  async login(email: string, password: string) {
    // Usa MongoAdapter para evitar problema de transação
    const user = await this.mongoAdapter.findOne('User', { email });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await PasswordUtil.comparePassword(password, user.password);
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT tokens
    const tokens = await this.jwtAuthService.generateTokens({
      id: user.id,
      email: user.email,
      name: user.name,
    });

    // Return user without password for security
    const { password: _, ...userWithoutPassword } = user;
    return { 
      message: 'Login successful',
      user: userWithoutPassword,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async register(name: string, email: string, password: string, role: string = 'admin') {
    // Check if user already exists usando MongoAdapter
    const existingUser = await this.mongoAdapter.findOne('User', { email });

    if (existingUser) {
      throw new UnauthorizedException('User already exists with this email');
    }

    // Hash the password before saving
    const hashedPassword = await PasswordUtil.hashPassword(password);

    // Create new user usando MongoAdapter (evita problema de transação)
    const userData = {
      name,
      email,
      password: hashedPassword,
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const user = await this.mongoAdapter.createDocument('User', userData);

    // Generate JWT tokens
    const tokens = await this.jwtAuthService.generateTokens({
      id: user.id,
      email: user.email,
      name: user.name,
    });

    // Return user without password for security
    const { password: _, ...userWithoutPassword } = user;
    return { 
      message: 'User registered successfully',
      user: userWithoutPassword,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

}
