import { capitalize, cn } from './utils';

describe('cn utility function', () => {
  test('returns a single class when one class is passed', () => {
    expect(cn('bg-red-500')).toBe('bg-red-500');
  });

  test('combines multiple classes into a single string', () => {
    expect(cn('bg-red-500', 'text-white')).toBe('bg-red-500 text-white');
  });

  test('ignores undefined, null, and false values', () => {
    expect(cn('bg-red-500', undefined, null, false, 'text-white')).toBe(
      'bg-red-500 text-white'
    );
  });

  test('merges conflicting Tailwind classes with tailwind-merge', () => {
    expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500');
  });

  test('returns an empty string when no classes are provided', () => {
    expect(cn()).toBe('');
  });

  test('works with arrays of class names', () => {
    expect(cn(['bg-red-500', 'text-white'])).toBe('bg-red-500 text-white');
  });

  test('merges nested arrays of class names', () => {
    expect(cn(['bg-red-500', ['text-white', 'p-4']])).toBe(
      'bg-red-500 text-white p-4'
    );
  });
});

describe('capitalize function', () => {
  test('capitalizes a single word', () => {
    expect(capitalize('hello')).toBe('Hello');
  });

  test('capitalizes each word in a sentence', () => {
    expect(capitalize('hello world')).toBe('Hello World');
  });

  test('handles a sentence with mixed case letters', () => {
    expect(capitalize('hELLO wORLD')).toBe('Hello World');
  });

  test('returns an empty string when input is an empty string', () => {
    expect(capitalize('')).toBe('');
  });

  test('handles a string with only spaces', () => {
    expect(capitalize('   ')).toBe('');
  });
});
