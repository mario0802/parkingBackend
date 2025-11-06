import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FloorService } from './floor.service';
import { CreateFloorDto } from './dto/create-floor.dto';
import { UpdateFloorDto } from './dto/update-floor.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('floor')
export class FloorController {
  constructor(private readonly floorService: FloorService) {}

  @Post()
  create(@Body() createFloorDto: CreateFloorDto) {
    return this.floorService.create(createFloorDto);
  }

  @Get()
  findAll(@Param() paginationDto:PaginationDto) {
    return this.floorService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.floorService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateFloorDto: UpdateFloorDto) {
    return this.floorService.update(id, updateFloorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.floorService.remove(+id);
  }
}
