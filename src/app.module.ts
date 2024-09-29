import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { EnglishTestModule } from './english-test/english-test.module';
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
import { UserNewWordModule } from './user-new-word/user-new-word.module';
import { TopicModule } from './topic/topic.module';
import { UserTopicModule } from './user-topic/user-topic.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
    MailModule,
    EnglishTestModule,
    TestModule,
    QuestionModule,
    GroupQuestionModule,
    PartModule,
    QuestionMediaModule,
    SubmissionModule,
    UserAnswerModule,
    CloudinaryModule,
    UsersModule,
    UserNewWordModule,
    TopicModule,
    UserTopicModule,
    CommentModule,
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
