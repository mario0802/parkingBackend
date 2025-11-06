import { IsBoolean, IsString, MinLength } from "class-validator"

export class CreateFloorDto {
    @IsString()
    @MinLength(1)
    name:string;

    @IsString()
    @MinLength(1)
    description:string;

    @IsBoolean()
    active?:boolean
}
