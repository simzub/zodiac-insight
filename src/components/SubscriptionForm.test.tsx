import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { expect, it } from 'vitest';
import SubscriptionForm from './SubscriptionForm';

it('should display required errors when value is not set for all inputs', async () => {
  render(<SubscriptionForm />);

  fireEvent.submit(screen.getByRole('button'));

  expect(await screen.findAllByRole('alert')).toHaveLength(4);
});

it('should display error when email is invalid', async () => {
  render(<SubscriptionForm />);

  fireEvent.input(screen.getByLabelText('Name:'), {
    target: {
      value: 'TestName',
    },
  });

  fireEvent.input(screen.getByLabelText('Email:'), {
    target: {
      value: 'invalidEmail',
    },
  });

  fireEvent.input(screen.getByLabelText('Time of Day for Delivery:'), {
    target: {
      value: '22:00',
    },
  });

  fireEvent.input(screen.getByLabelText('Date of Birth:'), {
    target: {
      value: '2024-07-11',
    },
  });

  fireEvent.submit(screen.getByRole('button'));

  expect(await screen.findAllByRole('alert')).toHaveLength(1);
});

it('should not display error when value is valid', async () => {
  render(<SubscriptionForm />);

  fireEvent.input(screen.getByLabelText('Name:'), {
    target: {
      value: 'TestName',
    },
  });

  fireEvent.input(screen.getByLabelText('Email:'), {
    target: {
      value: 'validEmail@test.com',
    },
  });

  fireEvent.input(screen.getByLabelText('Time of Day for Delivery:'), {
    target: {
      value: '22:00',
    },
  });

  fireEvent.input(screen.getByLabelText('Date of Birth:'), {
    target: {
      value: '2024-07-11',
    },
  });

  fireEvent.submit(screen.getByRole('button'));

  await waitFor(() => {
    expect(screen.queryAllByRole('alert')).toHaveLength(0);
  });
});
