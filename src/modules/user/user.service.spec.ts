import { sum } from "src/utils/sum"
import { UserService } from "./user.service"
import { Test, TestingModule } from "@nestjs/testing"

describe('User', () => {
 
  let service: UserService 

  beforeEach(async() => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService]
    }).compile()

    service = module.get<UserService>(UserService)
  })

  it('create', async() => {
    const data = {
      name: 'Marcos',
      
    }

    const result = await service.create(data)
    expect(result).toMatchObject(data)
  })

  
})