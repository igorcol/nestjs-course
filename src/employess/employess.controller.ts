import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Ip } from '@nestjs/common';
import { EmployessService } from './employess.service';
import { Prisma, Role } from '@prisma/client';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { MyLoggerService } from 'src/my-logger/my-logger.service';

@SkipThrottle()
@Controller('employess')
export class EmployessController {
  constructor(private readonly employessService: EmployessService) { }
  private readonly logger = new MyLoggerService(EmployessService.name);

  @Post()
  create(@Body() createEmployessDto: Prisma.EmployeeCreateInput) {
    return this.employessService.create(createEmployessDto);
  }

  @Get()
  findAll(@Ip() ip:string, @Query('role') role?: Role) {
    this.logger.log(`Get Request fot all employees\t ${ip}`);
    return this.employessService.findAll(role);
  }
  
  @Throttle({ short: { ttl: 1000, limit: 1 } })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employessService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployessDto: Prisma.EmployeeUpdateInput) {
    return this.employessService.update(+id, updateEmployessDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employessService.remove(+id);
  }
}
