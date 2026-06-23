import CommentInput from './CommentInput';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

const mockStore = configureStore({
  reducer: {
    auth: () => ({ user: { id: 'user-1' } }),
  },
});

export default {
  title: 'Components/CommentInput',
  component: CommentInput,
  decorators: [
    (Story) => (
      <Provider store={mockStore}>
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '24px' }}>
          <Story />
        </div>
      </Provider>
    ),
  ],
};

export const Default = {
  args: {
    threadId: 'thread-1',
  },
};
