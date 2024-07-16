import { applyDecorators } from '@nestjs/common';
import { ApiConsumes, ApiProduces } from '@nestjs/swagger';
import { APPLICATION_JSON_MEDIA_TYPE } from '../constants';

export function MimeTypes(mimeType?: string) {
  return applyDecorators(
    ApiConsumes(mimeType ?? APPLICATION_JSON_MEDIA_TYPE),
    ApiProduces(mimeType ?? APPLICATION_JSON_MEDIA_TYPE),
  );
}
