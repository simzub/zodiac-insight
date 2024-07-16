import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import BottomSnackbar from './Snackbar';

it('should display snackbar when isOpen is true', () => {
  render(<BottomSnackbar isOpen={true} handleOpen={vi.fn()} />);

  expect(screen.getByText('Thanks for subscribing!')).toBeInTheDocument();
  expect(
    screen.getByText('Your daily horoscope is on its way!')
  ).toBeInTheDocument();
});

it('should hide snackbar when isOpen is false', () => {
  render(<BottomSnackbar isOpen={false} handleOpen={vi.fn()} />);

  expect(screen.queryByText('Thanks for subscribing!')).not.toBeInTheDocument();
  expect(
    screen.queryByText('Your daily horoscope is on its way!')
  ).not.toBeInTheDocument();
});

it('should call handleOpen with false when close icon is clicked', async () => {
  const handleOpenMock = vi.fn();
  render(<BottomSnackbar isOpen={true} handleOpen={handleOpenMock} />);

  fireEvent.click(screen.getByRole('close'));

  await waitFor(() => expect(handleOpenMock).toHaveBeenCalledWith(false));
});
