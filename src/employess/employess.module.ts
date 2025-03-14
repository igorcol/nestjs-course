import { Module } from '@nestjs/common';
import { EmployessService } from './employess.service';
import { EmployessController } from './employess.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [EmployessController],
  providers: [EmployessService],
})
export class EmployessModule {}
