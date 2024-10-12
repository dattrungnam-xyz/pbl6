import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/createTag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entity/tag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
  ) {}

  async findOrCreateTags(listCreateTagDTO: CreateTagDto[]): Promise<Tag[]> {
    let tagPromise = listCreateTagDTO.map(async (tag) => {
      if (tag.id) {
        return this.tagRepository.findOneBy({ id: tag.id });
      }
      const tagSearch = await this.tagRepository.findOneBy({
        name: tag.name,
      });
      if (tagSearch) {
        return tagSearch;
      }
      return this.tagRepository.save(new Tag({ name: tag.name }));
    });
    const tags = await Promise.all(tagPromise);
    return tags;
  }

  create(createTagDto: CreateTagDto) {
    return 'This action adds a new tag';
  }

  findAll() {
    return `This action returns all tag`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tag`;
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return `This action updates a #${id} tag`;
  }

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }
}