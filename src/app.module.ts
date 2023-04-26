import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TagModule } from './tag/tag.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './ormConfig';
import { UserModule } from './user/user.module';
import { AuthMiddleware } from './user/Middleware/auth.middleware';

@Module({
  imports: [TypeOrmModule.forRoot(config), TagModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: "*",
      method: RequestMethod.ALL
    })
  }
}
