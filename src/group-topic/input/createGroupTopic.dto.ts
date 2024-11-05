import { IsNotEmpty, IsOptional, IsString, Matches, ValidateNested } from "class-validator";
import { CreateTagDTO } from "../../tag/input/createTag.dto";
import { Type } from "class-transformer";

export class CreateGroupTopicDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @Matches(/^data:image\/(png|jpg|jpeg|gif);base64,[A-Za-z0-9+/]+={0,2}$/, {
      message:
        'Thumbnail must be a valid Base64 encoded image (PNG, JPG, JPEG, GIF)',
    })
    thumbnail: string;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreateTagDTO)
    tags: CreateTagDTO[];
}