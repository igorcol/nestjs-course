import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { EmployessModule } from './employess/employess.module';
import { MyLoggerModule } from './my-logger/my-logger.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    EmployessModule,
    ThrottlerModule.forRoot([ // RATE LIMITING
      {
        name: 'short',
        ttl: 1000,
        limit: 3
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 100
      },
    ]),
    MyLoggerModule,

  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard,
  }],
})
export class AppModule { }
