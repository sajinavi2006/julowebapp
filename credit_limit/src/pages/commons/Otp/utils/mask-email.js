export function maskEmail(email) {
  if (!email) return;

  const charactersVisible = 2;
  const [username, domain] = email.split('@');
  const slicedUsername = username.slice(0, charactersVisible);
  const maskedUsername = '*'.repeat(username.length - charactersVisible);

  return slicedUsername + maskedUsername + '@' + domain;
}
