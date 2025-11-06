import { Module } from '@nestjs/common';
import { FloorService } from './floor.service';
import { FloorController } from './floor.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Floor } from './entities/floor.entity';

@Module({
  controllers: [FloorController],
  providers: [FloorService],
  imports: [
    TypeOrmModule.forFeature([Floor]),
    AuthModule, 
    UserModule
  ],
  exports: [TypeOrmModule]
})
export class FloorModule {}
