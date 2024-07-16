import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseArrayPipe,
  Inject,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { ORGANIZATION_SERVICE_KEY } from './organization.provider';
import { IFacade } from 'src/shared/inteface/facade.interace';
import { map, Observable } from 'rxjs';
import { OrganizationDTO } from 'src/dto/organization/organization.dto';
import {
  fromOrganizationEntityToRest,
  fromOrganizationMutateRestToEntity,
} from 'src/shared/mapper/organization/organization.mapper';
import { Organization } from 'src/domain/entity/organization';
import { ORGANIZATION_API } from 'src/shared/constants';
import { CreateOrganizationDTO } from 'src/dto/organization/create.organization.dto';
import { UpdateOranizationDTO } from 'src/dto/organization/update.organization.dto';

@ApiTags(ORGANIZATION_API)
@Controller(ORGANIZATION_API)
export class OrganizationController {
  constructor(
    @Inject(ORGANIZATION_SERVICE_KEY)
    protected readonly facade: IFacade<Organization>,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new organization' })
  @ApiBody({ type: CreateOrganizationDTO })
  @ApiResponse({
    status: 201,
    description: 'The organization has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  create(
    @Body() organization: CreateOrganizationDTO,
  ): Observable<OrganizationDTO> {
    return this.facade
      .create(fromOrganizationMutateRestToEntity(organization))
      .pipe(map((res) => fromOrganizationEntityToRest(res)));
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all organizations' })
  @ApiResponse({
    status: 200,
    description: 'Return all organizations.',
    isArray: true,
  })
  findAll() {
    return this.facade.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve an organization by ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID of the organization to retrieve',
  })
  @ApiResponse({
    status: 200,
    description: 'Return the organization with the specified ID.',
  })
  @ApiResponse({ status: 404, description: 'Organization not found.' })
  findOne(@Param('id') id: string) {
    return this.facade.get(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an organization by ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID of the organization to update',
  })
  @ApiBody({ type: UpdateOranizationDTO })
  @ApiResponse({
    status: 200,
    description: 'The organization has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Organization not found.' })
  update(@Param('id') id: number, @Body() organization: UpdateOranizationDTO) {
    return this.facade.update(id, organization);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete organizations by IDs' })
  @ApiQuery({
    name: 'ids',
    required: false,
    type: [Number],
    description: 'Comma-separated IDs of the organizations to delete',
  })
  @ApiResponse({
    status: 200,
    description: 'The organizations have been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Organizations not found.' })
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
    return this.facade.delete(ids);
  }
}
