import { render, screen } from '@testing-library/react';
import App from './App';
import { describe, expect, it } from 'vitest';

describe('App', () => {
  it('renders the App component', () => {
    render(<App />);

    const nameInput = screen.getByLabelText('Name:');
    expect(nameInput).toBeInTheDocument();
    expect(nameInput).toHaveAttribute('type', 'text');

    const emailInput = screen.getByLabelText('Email:');
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('type', 'text');

    const timeInput = screen.getByLabelText('Time of Day for Delivery:');
    expect(timeInput).toBeInTheDocument();
    expect(timeInput).toHaveAttribute('type', 'time');

    const dateInput = screen.getByLabelText('Date of Birth:');
    expect(dateInput).toBeInTheDocument();
    expect(dateInput).toHaveAttribute('type', 'date');

    const subscribeButton = screen.getByRole('button', { name: 'Subscribe' });
    expect(subscribeButton).toBeInTheDocument();
  });
});
