import { IsArray, IsBase64, IsEmail, IsEnum, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { Role } from "../../type/role.type";
import { UserDoesNotExist } from "../../validation/UserDoesNotExist.constraint";

export class UpdateProfileDTO
{
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsEmail()
    @UserDoesNotExist()
    email?: string;

    @IsOptional()
    @MinLength(10)
    @MaxLength(11)
    @UserDoesNotExist()
    phone?: string;

    @IsOptional()
    @IsArray()
    @IsEnum(Role, { message: "Invalid role." })
    role?: Role;

    @IsOptional()
    @Matches(
        /^data:image\/(png|jpg|jpeg|gif);base64,[A-Za-z0-9+/]+={0,2}$/,
        { message: 'Avatar must be a valid Base64 encoded image (PNG, JPG, JPEG, GIF)' }
    )
    avatar?: string;
}