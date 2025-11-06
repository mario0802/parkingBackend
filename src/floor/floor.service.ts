import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateFloorDto } from './dto/create-floor.dto';
import { UpdateFloorDto } from './dto/update-floor.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Floor } from './entities/floor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FloorService {
  constructor(
    @InjectRepository(Floor)
    private readonly floorRepository: Repository<Floor>
  ){}
  async create(createFloorDto: CreateFloorDto) {
    try {
      const floor = this.floorRepository.create({
        ...createFloorDto,
      })
      await this.floorRepository.save(floor)
      return {
        ...floor
      }
    } catch (error) {
      this.handleErrors(error)
    }
  }

  async findAll(paginarionDto: PaginationDto) {
    try {
      const {limit=10, offset=0} = paginarionDto;
      const floors = await this.floorRepository.find({
        take:limit,
        skip:offset
      });
      return floors
    } catch (error) {
      this.handleErrors(error)
    }
  }

  findOne(id: number) {
    try {
      const floor = this.floorRepository.findBy({id});
      if (!floor) throw new NotFoundException(`Floor with id ${id} not found.`)
        return floor
    } catch (error) {
      this.handleErrors(error)
    }
  }

  async update(id: number, updateFloorDto: UpdateFloorDto) {
    try {
      const floor = await this.floorRepository.findBy({id});
      if (!floor) throw new NotFoundException(`Floor with id ${id} not found.`)
      Object.assign(floor, updateFloorDto);

      const updated = await this.floorRepository.save(floor);
      return updated

    } catch (error) {
      this.handleErrors(error)
    }
  }

  async remove(id: number) {
    try {
      const user = await this.floorRepository.findOneBy({ id })
      if (!user) return new NotFoundException(`Floor with ${id} not found`)
      await this.floorRepository.remove( user );
    } catch (error) {
      this.handleErrors(error)
    }
  }

  handleErrors(error: any): any {
    if (error.code === '23505')
      throw new BadRequestException(error.detail);
    console.log(error)
    throw new InternalServerErrorException('Check server logs')
  }
}
