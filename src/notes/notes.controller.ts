import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtUtil } from 'src/auth/utils/jwt-util';

@Controller('notes')
@UseGuards(AuthGuard('jwt'))
export class NotesController {
  constructor(
    private readonly notesService: NotesService,
    private readonly jwtUtil: JwtUtil
  ) {}

  @Post()
  create(@Body() createNoteDto: CreateNoteDto, @Headers('Authorization') auth: string, ) {
    this.jwtUtil.getUserLogged(auth);
    return {};
    return this.notesService.create(createNoteDto);
  }

  @Get()
  findAll() {
    return this.notesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notesService.findOne({ where: {id: +id} });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(+id, updateNoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notesService.remove(+id);
  }
}
