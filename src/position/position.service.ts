import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Position } from './entities/position.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PositionService {

  constructor(
    @InjectRepository(Position)
    private readonly positionRepository: Repository<Position>,
  ) { }

  async create(createPositionDto: CreatePositionDto) {
    try {
      const position = this.positionRepository.create({ ...createPositionDto })
      await this.positionRepository.save(position)
      return {
        ...position
      }
    } catch (error) {
      this.handleErrors(error)
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const { limit = 0, offset = 0 } = paginationDto;
      const positions = await this.positionRepository.find({
        take: limit,
        skip: offset
      });
      return positions;
    } catch (error) {
      this.handleErrors(error)
    }
  }

  async findOne(id: number) {
    try {
      const position = await this.positionRepository.findOne({
        where:{id},
        relations:['floor']
      });
      if(!position) throw new NotFoundException(`Position with id ${id} not found`);
      return position;
    } catch (error) {
      this.handleErrors(error)
    }
  }

  async update(id: number, updatePositionDto: UpdatePositionDto) {
    try {
      const position = await this.positionRepository.findBy({id});
      if(!position) throw new NotFoundException(`Position with id ${id} not found`);
      Object.assign(position, updatePositionDto);
      const updated = await this.positionRepository.save(position);
      return updated;
    } catch (error) {
      this.handleErrors(error)
    }
  }

  async remove(id: number) {
    try {
      const position = await this.positionRepository.findOneBy({ id })
      if (!position) return new NotFoundException(`Position with ${id} not found`)
      await this.positionRepository.remove( position );
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async findByFloor(floorId: number) {
    try {
      const positions = await this.positionRepository.find({ 
        where:{
          floor: {id:floorId}
        }
      });
      return positions;
    } catch (error) {
      this.handleErrors(error);
    }
  }

  handleErrors(error: any): any {
    if (error.code === '23505')
      throw new BadRequestException(error.detail);
    console.log(error)
    throw new InternalServerErrorException('Check server logs')
  }
}
