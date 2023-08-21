import { ExecutionContext, NotFoundException, createParamDecorator } from "@nestjs/common";

export const User = createParamDecorator((filter:string, context: ExecutionContext) => {
  
  const request = context.switchToHttp().getRequest()

  if(filter){
    return request.user[filter]
  }

  if(request.user){
    return request.user 
  }

  throw new NotFoundException('Usuário não encontrado no Request. Use o AuthGuard para obter o usuário')
})