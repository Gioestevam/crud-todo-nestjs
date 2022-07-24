import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly notesRepository: Repository<Note>
) {}

  async create(data: CreateNoteDto) {
    const note = this.notesRepository.create(data);
    return await this.notesRepository.save(note);
  }

  async findAll() {
    return await this.notesRepository.find({
      select: ['id', 'title', 'description', 'status', 'user', 'created_at', 'updated_at'],
    });
  }

  async findOne(where: FindOneOptions<Note>) {
    return await this.notesRepository.findOneOrFail(where);
  }

  async update(id: number, updateNoteDto: UpdateNoteDto) {
    const note = await this.findOne({ where: {id: id} });
    this.notesRepository.merge(note, updateNoteDto);
    return await this.notesRepository.save(note);
  }

  async remove(id: number) {
    await this.notesRepository.findOneOrFail({ where: {id: id} });
    this.notesRepository.softDelete({ id });
  }
}
