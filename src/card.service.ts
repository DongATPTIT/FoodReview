import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './card.entity';
import { CreateCardDto } from './card.dto';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private cardRespository: Repository<Card>,
  ) {}
  async createCard(createCard: CreateCardDto) {
    console.log(createCard);
    await this.cardRespository.save(createCard);
  }

  async findAll() {
    return await this.cardRespository.find();
  }
}
