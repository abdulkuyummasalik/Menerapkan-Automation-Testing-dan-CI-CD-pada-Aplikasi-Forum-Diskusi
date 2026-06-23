/**
 * Skenario pengujian CommentInput component:
 *
 * - should render textarea and submit button
 * - should handle textarea typing correctly
 * - should call dispatch when form is submitted
 * - should clear textarea after submit
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CommentInput from './CommentInput';

const mockDispatch = vi.fn(() => Promise.resolve());

vi.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

describe('CommentInput component', () => {
  it('should render textarea and submit button', () => {
    render(<CommentInput threadId="thread-1" />);

    expect(screen.getByPlaceholderText('Tulis komentarmu...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Kirim Komentar' })).toBeInTheDocument();
  });

  it('should handle textarea typing correctly', async () => {
    render(<CommentInput threadId="thread-1" />);
    const textarea = screen.getByPlaceholderText('Tulis komentarmu...');

    await userEvent.type(textarea, 'Komentar baru saya');
    expect(textarea).toHaveValue('Komentar baru saya');
  });

  it('should call dispatch when form is submitted with content', async () => {
    render(<CommentInput threadId="thread-1" />);
    const textarea = screen.getByPlaceholderText('Tulis komentarmu...');
    const submitButton = screen.getByRole('button', { name: 'Kirim Komentar' });

    await userEvent.type(textarea, 'Komentar baru');
    await userEvent.click(submitButton);

    expect(mockDispatch).toHaveBeenCalled();
  });

  it('should clear textarea after successful submit', async () => {
    render(<CommentInput threadId="thread-1" />);
    const textarea = screen.getByPlaceholderText('Tulis komentarmu...');
    const submitButton = screen.getByRole('button', { name: 'Kirim Komentar' });

    await userEvent.type(textarea, 'Komentar baru');
    await userEvent.click(submitButton);

    expect(textarea).toHaveValue('');
  });
});
