import ThreadItem from './ThreadItem';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

const mockStore = configureStore({
  reducer: {
    auth: () => ({ user: { id: 'user-1' } }),
  },
});

export default {
  title: 'Components/ThreadItem',
  component: ThreadItem,
  decorators: [
    (Story) => (
      <Provider store={mockStore}>
        <MemoryRouter>
          <div style={{ maxWidth: '600px', margin: '0 auto', padding: '24px' }}>
            <Story />
          </div>
        </MemoryRouter>
      </Provider>
    ),
  ],
};

const fakeThread = {
  id: 'thread-1',
  title: 'Bahas React di tahun 2026',
  body: '<p>React semakin berkembang dengan <b>Server Components</b> dan arsitektur yang lebih solid.</p>',
  category: 'react',
  createdAt: '2026-06-21T07:00:00.000Z',
  ownerId: 'user-2',
  upVotesBy: ['user-3', 'user-4'],
  downVotesBy: [],
  totalComments: 12,
};

const fakeUsers = [
  {
    id: 'user-2',
    name: 'Dimas Maulana',
    avatar: 'https://ui-avatars.com/api/?name=Dimas+Maulana&background=random',
  },
];

export const Default = {
  args: {
    thread: fakeThread,
    users: fakeUsers,
  },
};
