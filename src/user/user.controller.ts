import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  ParseArrayPipe,
  Query,
} from '@nestjs/common';
import { CreateUserDTO } from 'src/dto/user/create.user.dto';
import { UpdateUserDTO } from 'src/dto/user/update.user.dto';
import { IFacade } from 'src/shared/inteface/facade.interace';
import { User } from 'src/domain/entity/user';
import {
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { USER_FACADE_KEY } from './user.provider';
import { map, Observable } from 'rxjs';
import { UserDTO } from 'src/dto/user/user.dto';
import {
  fromUserEntityToRest,
  fromUserMutateRestToEntity,
} from 'src/shared/mapper/user/user.mapper';
import { USER_API } from 'src/shared/constants';

@ApiTags(USER_API)
@Controller(USER_API)
export class UserController {
  constructor(
    @Inject(USER_FACADE_KEY)
    protected readonly userFacade: IFacade<User>,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDTO })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  create(@Body() createUserDto: CreateUserDTO): Observable<UserDTO> {
    return this.userFacade
      .create(fromUserMutateRestToEntity(createUserDto))
      .pipe(map(fromUserEntityToRest));
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiResponse({
    status: 200,
    description: 'Return all users.',
  })
  findAll() {
    return this.userFacade.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a user by ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID of the user to retrieve',
  })
  @ApiResponse({
    status: 200,
    description: 'Return the user with the specified ID.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  findOne(@Param('id') id: string) {
    return this.userFacade.get(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID of the user to update',
  })
  @ApiBody({ type: UpdateUserDTO })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDTO) {
    return this.userFacade.update(+id, updateUserDto);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete users by IDs' })
  @ApiQuery({
    name: 'ids',
    required: false,
    type: [Number],
    description: 'Comma-separated IDs of the users to delete',
  })
  @ApiResponse({
    status: 200,
    description: 'The users have been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Users not found.' })
  delete(
    @Query(
      'ids',
      new ParseArrayPipe({
        items: Number,
        separator: ',',
        optional: true,
      }),
    )
    ids: number[],
  ) {
    return this.userFacade.delete(ids);
  }
}
