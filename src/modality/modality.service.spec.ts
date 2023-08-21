import { Test, TestingModule } from '@nestjs/testing';
import { ModalityService } from './modality.service';
import { PrismaService } from '../prisma/prisma.service';

describe('ModalityService', () => {
  let service: ModalityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModalityService, PrismaService],
    }).compile();

    service = module.get<ModalityService>(ModalityService);
  });

  it('Create', async() => {
    const data = {
      name: 'test'
    }

    const res = await service.create(data)
    expect(res).toMatchObject(data)

   await service.remove(res.id)
  });

  it('Find All', async() => {
    const res = await service.findAll()

    expect(res.length).toBeGreaterThan(1)

    res.forEach(place => {
      expect(place).toHaveProperty('name')
    })
  })

  it('Find One', async() => {
    
    const res = await service.findOne(1)

    expect(res).toHaveProperty('name')
  })

  it('Update', async() => {
    const data = {
      name: 'test update'
    }

    const res = await service.update(1, data)
    expect(res).toMatchObject(data)

  })
});
