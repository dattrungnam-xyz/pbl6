import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { TestModule } from './test/test.module';
import { QuestionModule } from './question/question.module';
import { GroupQuestionModule } from './group-question/group-question.module';
import { PartModule } from './part/part.module';
import { QuestionMediaModule } from './question-media/question-media.module';
import { SubmissionModule } from './submission/submission.module';
import { UserAnswerModule } from './user-answer/user-answer.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/roles.guard';
import { UsersModule } from './users/users.module';
import { TagModule } from './tag/tag.module';
import { TopicModule } from './topic/topic.module';
import { TopicQuestionModule } from './topic-question/topic-question.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
    MailModule,
    TestModule,
    QuestionModule,
    GroupQuestionModule,
    PartModule,
    QuestionMediaModule,
    SubmissionModule,
    UserAnswerModule,
    CloudinaryModule,
    UsersModule,
    TagModule,
    TopicModule,
    TopicQuestionModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
