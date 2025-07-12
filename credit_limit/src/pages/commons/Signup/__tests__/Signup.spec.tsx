import {
  render,
  screen,
  waitFor,
} from 'utils/react-testing-library';

import OjkImage from 'assets/img/OJK.svg';
import JuloImage from 'assets/img/logo-vertical.svg';

import Signup from '../Signup';

function getNikField() {
  return screen.queryByTestId('nik') as HTMLInputElement;
}

function initialRender() {
  render(<Signup />);
}

describe('Initial render', () => {
  it('should render Signup Page normally', async () => {
    initialRender();

    await waitFor(() => {
      const juloLogo = screen.getByTestId('julo-logo');
      const ojkLogo = screen.getByTestId('ojk-logo');
      const nikField = getNikField();

      expect(juloLogo).toBeInTheDocument();
      expect(juloLogo).toHaveAttribute('alt', 'julo-logo');
      expect(juloLogo).toHaveAttribute('src', JuloImage);

      expect(nikField).toBeInTheDocument();
      screen.getByText('Berizin dan diawasi oleh');

      expect(ojkLogo).toBeInTheDocument();
      expect(ojkLogo).toHaveAttribute('alt', 'ojk-logo');
      expect(ojkLogo).toHaveAttribute('src', OjkImage);
    });
  });
});
