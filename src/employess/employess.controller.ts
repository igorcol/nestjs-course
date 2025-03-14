import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Ip } from '@nestjs/common';
import { EmployessService } from './employess.service';
import { Prisma, Role } from '@prisma/client';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { MyLoggerService } from 'src/my-logger/my-logger.service';

@SkipThrottle()
@Controller('employess')
export class EmployessController {
  constructor(private readonly employessService: EmployessService) { }
  private readonly logger = new MyLoggerService(EmployessController.name);

  private logData(data: any, ip?: string, path?: string) {
    return this.logger.log(`${data}\t ${ip}`, path);
  }
z
  @Post()
  create(@Ip() ip:string, @Body() createEmployessDto: Prisma.EmployeeCreateInput) {
    this.logData('Create Employee', ip, EmployessController.name);
    return this.employessService.create(createEmployessDto);
  }

  @Get()
  findAll(@Ip() ip:string, @Query('role') role?: Role) {
    this.logData('Get all employees', ip, EmployessController.name);
    return this.employessService.findAll(role);
  }
  
  @Throttle({ short: { ttl: 1000, limit: 1 } })
  @Get(':id')
  findOne(@Ip() ip:string, @Param('id') id: string) {
    this.logData(`Get employee by id #${id}`, ip, EmployessController.name);
    return this.employessService.findOne(+id);
  }

  @Patch(':id')
  update(@Ip() ip:string, @Param('id') id: string, @Body() updateEmployessDto: Prisma.EmployeeUpdateInput) {
    this.logData(`Update employee id #${id}`, ip, EmployessController.name);
    return this.employessService.update(+id, updateEmployessDto);
  }

  @Delete(':id')
  remove(@Ip() ip:string, @Param('id') id: string) {
    this.logData(`Delete employee id #${id}`, ip, EmployessController.name);
    return this.employessService.remove(+id);
  }
}
