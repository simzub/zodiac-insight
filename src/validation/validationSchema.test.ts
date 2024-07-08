import { describe, expect, it } from 'vitest';
import schema from './validationSchema';

describe('Validation Schema', () => {
  it('should validate a valid object', async () => {
    const validObj = {
      name: 'TestName',
      email: 'test@test.com',
      date: new Date(),
      time: '10:00 AM',
    };

    await expect(schema.validate(validObj)).resolves.toEqual(validObj);
  });

  it('should reject missing required fields', async () => {
    const invalidObj = {
      name: 'TestName',
    };

    await expect(schema.validate(invalidObj)).rejects.toThrow();
  });

  it('should reject invalid email', async () => {
    const invalidEmailObject = {
      name: 'TestName',
      email: 'test',
      date: new Date(),
      time: '10:00 AM',
    };

    await expect(schema.validate(invalidEmailObject)).rejects.toThrow();
  });
});
