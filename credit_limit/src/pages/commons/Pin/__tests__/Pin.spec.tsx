import { Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import {
  render,
  screen,
  waitFor,
  fireEvent,
} from 'utils/react-testing-library';
import { POST } from '__mocks__/axios.mock';
import { NIK_TRUE_VALUE, PIN } from '__mocks__/constants';

import Pin from '../Pin';
import {
  appXid,
  CHECK_STRONG_PIN_MOCK_RESPONSE,
  pinHistory,
  xid,
} from './constants';

function getAllPinInput() {
  const arrInput: Array<HTMLInputElement> = [];
  for (let i = 0; i < 6; i++) {
    const input = screen.queryByTestId(`otp-input-${i}`);
    if (!input) continue;
    arrInput.push(input as HTMLInputElement);
  }

  return arrInput;
}

function initialRender() {
  render(
    <Route path={'/:partner/pin'}>
      <Pin />
    </Route>,
    {
      history: pinHistory,
    },
  );
}

describe('Initial render', () => {
  beforeAll(() => {
    window.sessionStorage.setItem('nik', NIK_TRUE_VALUE);
  });

  it('should render normally', async () => {
    initialRender();

    await waitFor(async () => {
      const backBtn = screen.getByTestId('back-btn');
      const pinInputs = getAllPinInput();
      screen.getByText('Buat PIN');
      expect(backBtn).toBeInTheDocument();
      expect(pinInputs).toHaveLength(6);
      screen.getByText('Ketik PIN Baru');
      screen.getByText(
        'Pastikan Anda mengingat PIN ini dan merahasiakannya dari siapapun',
      );
    });
  });

  it('should go back to singup page on back-btn click', async () => {
    initialRender();

    const backBtn = screen.getByTestId('back-btn');
    await fireEvent.click(backBtn);
    expect(pinHistory.location.pathname).toBe('/sellury/signup');
  });

  it('should be redirected to signup', async () => {
    window.sessionStorage.removeItem('nik');

    initialRender();

    expect(pinHistory.location.pathname).toBe('/sellury/signup');

    window.sessionStorage.setItem('nik', NIK_TRUE_VALUE);
  });

  it('should show dialog when partner klop without xid and appXid', async () => {
    pinHistory.push('/klop/pin');

    initialRender();

    expect(
      await screen.findByText('Tidak dapat melakukan registrasi'),
    ).toBeInTheDocument();
    expect(
      await screen.findByText('Mohon registrasi melalui aplikasi KLOP'),
    ).toBeInTheDocument();
  });

  it('should show dialog when partner klop without xid and appXid', async () => {
    pinHistory.push('/klop/pin');

    initialRender();

    await waitFor(() => {
      expect(screen.queryByTestId('dialog')).toBeInTheDocument();
      expect(
        screen.queryByText('Tidak dapat melakukan registrasi'),
      ).toBeInTheDocument();
      expect(
        screen.queryByText('Mohon registrasi melalui aplikasi KLOP'),
      ).toBeInTheDocument();
    });
  });

  it("shouldn't show dialog when partner klop with xid and appXid", async () => {
    pinHistory.push(`/klop/pin?xid=${xid}&appXid=${appXid}`);

    initialRender();

    await waitFor(() => {
      expect(screen.queryByTestId('dialog')).not.toBeInTheDocument();
      expect(
        screen.queryByText('Tidak dapat melakukan registrasi'),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText('Mohon registrasi melalui aplikasi KLOP'),
      ).not.toBeInTheDocument();
    });
  });

  afterEach(() => {
    pinHistory.goBack();
  });
});

describe('Input Pin flow', () => {
  beforeEach(() => {
    POST.mockReturnValueOnce(Promise.resolve(CHECK_STRONG_PIN_MOCK_RESPONSE));
  });

  it('should move to re-enter pin on success', async () => {
    initialRender();

    const pinInputs = getAllPinInput();

    for (let i = 0; i < PIN.length; i++) {
      await userEvent.type(pinInputs[i], PIN[i]);
    }

    await screen.findByText('Ketik Ulang PIN Baru');
  });

  it('should move to tnc page on success', async () => {
    POST.mockReturnValueOnce(Promise.resolve(CHECK_STRONG_PIN_MOCK_RESPONSE));

    initialRender();

    const pinInputs = getAllPinInput();

    for (let i = 0; i < PIN.length; i++) {
      await userEvent.type(pinInputs[i], PIN[i]);
    }

    for (let i = 0; i < PIN.length; i++) {
      await userEvent.type(pinInputs[i], PIN[i]);
    }

    expect(pinHistory.location.pathname).toContain('/tnc');
  });
});
