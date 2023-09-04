import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VideosService {

  constructor(private prisma:PrismaService){}


  async create(createVideoDto: CreateVideoDto & {file: Express.Multer.File}) {

    
    const categoryExist = await this.prisma.category.count({
      where:{
        id: createVideoDto.category_id
      }
    }) !== 0
    
    if(!categoryExist){
      throw new NotFoundException('Category Not Found')
    }

    // delete createVideoDto.file 
    console.log(createVideoDto.file)
    return createVideoDto
    return this.prisma.video.create({
      data:{
        ...createVideoDto,
        file_path: createVideoDto.file.path
      }
    })
  }

  findAll() {
    return this.prisma.video.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} video`;
  }

  update(id: number, updateVideoDto: UpdateVideoDto) {
    return `This action updates a #${id} video`;
  }

  remove(id: number) {
    return `This action removes a #${id} video`;
  }
}
