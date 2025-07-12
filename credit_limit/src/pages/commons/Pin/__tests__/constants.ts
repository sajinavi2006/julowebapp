import { createMemoryHistory } from 'history';

export const CHECK_STRONG_PIN_MOCK_RESPONSE = {
  data: 'Strong password',
  errors: [],
  success: true,
};

export const pinHistory = createMemoryHistory({
  initialEntries: ['/sellury/pin'],
});

export const xid = '2798069636';
export const appXid =
  'Z0FBQUFBQmo3Rmt4QjZBdy1OUUdnMXdHY3NPZmEta2JDQm5OVUt5RFMwT05aQ3VReW5zX09MY3BZVFlwd291SFlwbXlYSDlhX0hwcGpNTjVQaHNTSEZwS1lmVHFXRVNLQ2c9PQ==';
