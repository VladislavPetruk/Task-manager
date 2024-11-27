import { UserTag } from '@prisma/client';
import { filterTags } from './filterTags';
import { formatISODate } from './formatISODate';

describe('filterTags', () => {
  let mockUserTags: Array<UserTag>;

  beforeEach(() => {
    mockUserTags = [
      {
        id: '1',
        userId: 'user1',
        value: 'important',
        color: '#ff0000',
        createdAt: new Date(),
      },
      {
        id: '2',
        userId: 'user1',
        value: 'optional',
        color: '#00ff00',
        createdAt: new Date(),
      },
    ];
  });

  it('should return the matching tag if taskTag exists in userTags', () => {
    const result = filterTags('important', mockUserTags);

    expect(result).toEqual(mockUserTags[0]);
  });

  it('should return null if taskTag does not exist in userTags', () => {
    const result = filterTags('urgent', mockUserTags);

    expect(result).toBeNull();
  });

  it('should return null if userTags is an empty array', () => {
    const result = filterTags('important', []);

    expect(result).toBeNull();
  });

  it('should handle case sensitivity correctly', () => {
    const result = filterTags('IMPORTANT', mockUserTags);

    expect(result).toBeNull();
  });

  it('should not mutate the original userTags array', () => {
    const originalTags = [...mockUserTags];

    filterTags('important', mockUserTags);

    expect(mockUserTags).toEqual(originalTags);
  });
});

describe('formatISODate', () => {
  it('should correctly format the date string in default locale (uk-UA)', () => {
    const dateString = '2023-11-27T15:30:00Z';

    const result = formatISODate(dateString);

    expect(result).toBe('27.11.2023, 17:30');
  });

  // it('should correctly format the date string in a custom locale (en-US)', () => {
  //   const dateString = '2023-11-27T15:30:00Z';

  //   const result = formatISODate(dateString, 'en-US');

  //   expect(result).toBe('11/27/2023, 3:30 PM');
  // });

  it('should handle invalid date strings and throw an appropriate error', () => {
    const invalidDateString = 'not-a-valid-date';

    expect(() => formatISODate(invalidDateString)).toThrow(RangeError);
  });

  // it('should handle edge case with epoch date (1970-01-01T00:00:00Z)', () => {
  //   const epochDateString = '1970-01-01T00:00:00Z';

  //   const result = formatISODate(epochDateString);

  //   expect(result).toBe('01.01.1970, 02:00');
  // });
});
