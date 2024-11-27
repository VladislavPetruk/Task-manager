import { UserTag } from '@prisma/client';

export const filterTags = (taskTag: string, userTags: Array<UserTag>) =>
  userTags.find((tag) => tag.value === taskTag) || null;
