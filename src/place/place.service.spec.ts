import { Test, TestingModule } from '@nestjs/testing';
import { PlaceService } from './place.service';
import { PrismaService } from '../prisma/prisma.service';

describe('PlaceService', () => {
  let service: PlaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlaceService, PrismaService],
    }).compile();

    service = module.get<PlaceService>(PlaceService);
  });

  it('Create', async() => {
    const data = {
      name: 'place test'
    }

    const place = await service.create(data)
    expect(place).toMatchObject(data)

    service.remove(place.id)
  });

  it('Find All', async() => {
    const places = await service.findAll()

    expect(places.length).toBeGreaterThan(1)

    places.forEach(place => {
      expect(place).toHaveProperty('name')
    })
  })

  it('Find One', async() => {
    
    const place = await service.findOne(1)

    expect(place).toHaveProperty('name')
  })

  it('Update', async() => {
    const data = {
      name: 'place update'
    }

    const place = await service.update(1, data)
    expect(place).toMatchObject(data)

  })


});
