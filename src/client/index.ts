import type { IncomingMessage } from 'http';
import { getClient } from '@faustjs/next';
import {
  generatedSchema,
  scalarsEnumsHash,
  GeneratedSchema,
  SchemaObjectTypes,
  SchemaObjectTypesNames,
} from './schema.generated';

export const client = getClient<
  GeneratedSchema,
  SchemaObjectTypesNames,
  SchemaObjectTypes
  >({
  schema: generatedSchema,
  scalarsEnumsHash,
});

export function serverClient(req: IncomingMessage) {
  return getClient<GeneratedSchema, SchemaObjectTypesNames, SchemaObjectTypes>({
    schema: generatedSchema,
    scalarsEnumsHash,
    context: req,
  });
}

export * from './schema.generated';