import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './common/config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { TestModule } from './test/test.module';
import { QuestionModule } from './question/question.module';
import { GroupQuestionModule } from './group-question/group-question.module';
import { PartModule } from './part/part.module';
import { QuestionMediaModule } from './question-media/question-media.module';
import { UserAnswerModule } from './user-answer/user-answer.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/roles.guard';
import { UsersModule } from './users/users.module';
import { TagModule } from './tag/tag.module';
import { TopicModule } from './topic/topic.module';
import { GroupTopicModule } from './group-topic/group-topic.module';
import { WordModule } from './word/word.module';
import { UserTopicModule } from './user-topic/user-topic.module';
import { CommentModule } from './comment/comment.module';
import { TestPracticeModule } from './test-practice/test-practice.module';
import { TranslateModule } from './translate/translate.module';
import { TopicHistoryModule } from './topic-history/topic-history.module';
import { RatingModule } from './rating/rating.module';
import { ListenGroupModule } from './listen-group/listen-group.module';
import { ListenLessonModule } from './listen-lesson/listen-lesson.module';
import { ListenSentenceModule } from './listen-sentence/listen-sentence.module';
import { ScheduleModule } from '@nestjs/schedule';
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
    UserAnswerModule,
    CloudinaryModule,
    UsersModule,
    TagModule,
    TopicModule,
    GroupTopicModule,
    WordModule,
    UserTopicModule,
    CommentModule,
    TestPracticeModule,
    TranslateModule,
    TopicHistoryModule,
    RatingModule,
    ListenGroupModule,
    ListenLessonModule,
    ListenSentenceModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
