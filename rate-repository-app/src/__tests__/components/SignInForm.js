import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SignInForm from '../../components/SignInForm';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', async () => {
      const onSubmit = jest.fn();
      const { getByText, getByPlaceholderText } = render(<SignInForm onSubmit={onSubmit} />);
      fireEvent.changeText(getByPlaceholderText('username'), 'test');
      fireEvent.changeText(getByPlaceholderText('password'), 'tester');
      fireEvent.press(getByText('Login'));
      await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
      expect(onSubmit.mock.calls[0][0]).toEqual({
        username: 'test',
        password: 'tester'
      });
    });
  });
});
