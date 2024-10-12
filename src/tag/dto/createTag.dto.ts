import { IsOptional, IsString, IsUUID } from "class-validator";

export class CreateTagDto {
    @IsOptional()
    @IsUUID()
    id: string;


    @IsOptional()
    @IsString()
    name: string
}
