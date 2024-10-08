import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Test } from './entity/test.entity';
import { Repository } from 'typeorm';
import { CreateTestDTO } from './input/createTest.dto';
import { UpdateTestDTO } from './input/updateTest.dto';
import { Tag } from '../tag/entity/tag.entity';
import { Part } from '../part/entity/part.entity';
import { GroupQuestion } from '../group-question/entity/groupQuestion.entity';
import { Question } from '../question/entity/question.entity';
import { runInThisContext } from 'vm';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(Test) private readonly testRepository: Repository<Test>,
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
    @InjectRepository(Part) private readonly partRepository: Repository<Part>,
    @InjectRepository(GroupQuestion)
    private readonly groupQuestionRepository: Repository<GroupQuestion>,
  ) {}

  // async createTest(createTestDTO: CreateTestDTO): Promise<Test> {
  //   return await this.testRepository.save(new Test({ ...createTestDTO }));
  // }

  async createEntireTest(createTestDTO: CreateTestDTO): Promise<Test> {
    // create test
    let test = new Test({
      name: createTestDTO.name,
      time: createTestDTO.time || 120,
    });
    test = await this.testRepository.save(test);
    // handle mapping tag or create tag
    let tagPromise = createTestDTO.tags.map(async (tag) => {
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
    test.tags = Promise.resolve(tags);
    let groupQuestions = [];
    // handle create group question
    createTestDTO.partData.forEach(async (data) => {
      const part = await this.partRepository.findOneBy({ name: data.part });
      if (!part) {
        throw new NotFoundException('Part not found!');
      }
      let listGroupQuestion = data.groupQuestionData.map(
        async (groupQuestion) => {
          const newGroupQuestion = new GroupQuestion({
            part: Promise.resolve(part),
          });
          if (groupQuestion.describeAnswer) {
            newGroupQuestion.describeAnswer = groupQuestion.describeAnswer;
          }
          if (groupQuestion.detail) {
            newGroupQuestion.detail = groupQuestion.detail;
          }

          const listQuestion = groupQuestion.questionData.map((question) => {
            const newQuestion = new Question({
              answer: question.answer,
              explain: question.explain,
              question: question.question,
              optionA: question.optionA,
              optionB: question.optionB,
              optionC: question.optionC,
              questionNumber: question.questionNumber,
            });
            if (question.optionD) {
              newQuestion.optionD = question.optionD;
            }
            return newQuestion;
          });

          newGroupQuestion.questions = Promise.resolve(listQuestion);
          newGroupQuestion.test = Promise.resolve(test);
          return await this.groupQuestionRepository.save(newGroupQuestion);
        },
      );
      groupQuestions = [...groupQuestions, ...listGroupQuestion];
    });
    test.groupQuestions = Promise.resolve(groupQuestions);
    return await this.testRepository.save(test);
  }

  // async updateTest(updateTestDTO: UpdateTestDTO): Promise<Test> {
  //   let test = await this.testRepository.findOneBy({ id: updateTestDTO.id });
  //   if (!test) {
  //     throw new NotFoundException('Test not found.');
  //   }
  //   return await this.testRepository.save(
  //     new Test({ ...test, ...updateTestDTO }),
  //   );
  // }
  async deleteTest(id: string) {
    return await this.testRepository.softDelete(id);
  }
  async findAll() {
    return await this.testRepository.find({
      relations: ['tags', 'groupQuestions', 'groupQuestions.questions'],
    });
  }
}
