import { IsOptional, IsString, IsUUID } from "class-validator";

export class CreateTagDTO {
    @IsOptional()
    @IsUUID()
    id: string;


    @IsOptional()
    @IsString()
    name: string
}
