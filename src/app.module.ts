import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TagModule } from './tag/tag.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './ormConfig';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(config), TagModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
