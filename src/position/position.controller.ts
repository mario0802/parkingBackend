import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PositionService } from './position.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('position')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Post()
  create(@Body() createPositionDto: CreatePositionDto) {
    return this.positionService.create(createPositionDto);
  }

  @Get()
  findAll(@Param() paginationDto: PaginationDto) {
    return this.positionService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.positionService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePositionDto: UpdatePositionDto) {
    return this.positionService.update(id, updatePositionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.positionService.remove(id);
  }
  @Get('positionByFloor/:floorId')
  findByFloor(@Param('floorId') floorId: number) {
    return this.positionService.findByFloor(floorId);
  }
}
