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
import { ORGANIZATION_SERVICE_KEY } from './organization.provider';
import { IFacade } from 'src/shared/inteface/facade.interace';
import { map, Observable } from 'rxjs';
import {
  MutateCustomerDTO,
  OrganizationDTO,
} from 'src/dto/organization/organization.dto';
import {
  fromEntityToRest,
  fromMutateRestToEntity,
} from 'src/shared/mapper/organization/organization.mapper';
import { Organization } from 'src/domain/entity/organization';

@Controller('organization')
export class OrganizationController {
  constructor(
    @Inject(ORGANIZATION_SERVICE_KEY)
    protected readonly facade: IFacade<Organization>,
  ) {}

  @Post()
  create(@Body() organization: MutateCustomerDTO): Observable<OrganizationDTO> {
    return this.facade
      .create(fromMutateRestToEntity(organization))
      .pipe(map((res) => fromEntityToRest(res)));
  }

  @Get()
  findAll() {
    return this.facade.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.facade.get(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() organization: MutateCustomerDTO) {
    throw new Error('Not implemented');
  }

  @Delete(':id')
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
