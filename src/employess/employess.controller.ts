import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { EmployessService } from './employess.service';
import { Prisma } from '@prisma/client';

@Controller('employess')
export class EmployessController {
  constructor(private readonly employessService: EmployessService) {}

  @Post()
  create(@Body() createEmployessDto: Prisma.EmployeeCreateInput) {
    return this.employessService.create(createEmployessDto);
  }

  @Get()
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return this.employessService.findAll(role);
  }

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
