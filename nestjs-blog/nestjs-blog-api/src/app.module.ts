import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { PongModule } from './pong/pong.module';

@Module({
  imports: [PostsModule, PongModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
