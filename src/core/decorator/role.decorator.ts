import { SetMetadata } from '@nestjs/common';
export const ROLE="roles"
export const Roles = (...roles: string[]) => SetMetadata(ROLE, roles);