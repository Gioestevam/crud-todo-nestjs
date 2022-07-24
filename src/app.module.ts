import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

import { AuthModule } from './auth/auth.module';
import { NotesModule } from './notes/notes.module';
import { UsersModule } from './users/users.module';

import { Note } from './notes/entities/note.entity';
import { User } from './users/entities/user.entity';
import { JwtUtil } from './auth/utils/jwt-util';

const config: SqliteConnectionOptions = {
  type: 'sqlite',
  database: '../db',
  entities: [Note, User],
  synchronize: true
}

@Module({
  imports: [
    AuthModule,
    UsersModule,
    NotesModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(config),
  ],
  controllers: [],
  providers: [JwtUtil],
})
export class AppModule {}
