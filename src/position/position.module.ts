import { Module } from '@nestjs/common';
import { PositionService } from './position.service';
import { PositionController } from './position.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Floor } from '../floor/entities/floor.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { Position } from './entities/position.entity';

@Module({
  controllers: [PositionController],
  providers: [PositionService],
  imports: [
      TypeOrmModule.forFeature([Position]),
      AuthModule, 
      UserModule
    ],
    exports: [TypeOrmModule]
})
export class PositionModule {}
