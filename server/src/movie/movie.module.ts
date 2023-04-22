import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MovieSchema } from 'src/schema/movie.schema';
import { MulterModule } from '@nestjs/platform-express/multer';
import { multerMovie } from './movie.file';
import { UserModule } from 'src/user/user.module';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
    MulterModule.register(multerMovie),
    UserModule,
    CategoryModule,
  ],
  providers: [MovieService],
  controllers: [MovieController],
})
export class MovieModule {}
