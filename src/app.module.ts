import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StatusModule } from './status/status.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';

const dbPort = Number.parseInt(process.env.DB_PORT ?? '5432', 10);
const isDev = (process.env.NODE_ENV ?? 'development') === 'development';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: Number.isNaN(dbPort) ? 5432 : dbPort,
      username: process.env.DB_USERNAME ?? 'ups',
      password: process.env.DB_PASSWORD ?? 'ups123',
      database: process.env.DB_NAME ?? 'devdb-nest',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: isDev,
      logging: isDev,
    }),
    StatusModule,
    UsersModule,
    ProductsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
