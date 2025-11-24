import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as dotenv from 'dotenv';
import { User } from './domain/user';
import { AuthModule } from './domain/auth';
import { UserModule } from './domain/user/user.module';
dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL'),
        entities: [User],
        migrations: [],
        synchronize: true,
      }),
    }),
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
