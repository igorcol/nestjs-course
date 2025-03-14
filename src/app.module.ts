import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { EmployessModule } from './employess/employess.module';

@Module({
  imports: [UsersModule, DatabaseModule, EmployessModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
