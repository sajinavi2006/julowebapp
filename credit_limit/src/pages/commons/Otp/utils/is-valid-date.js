export default function isValidDate(value) {
  if (!value) return false;

  if (typeof value === 'string') return !Number.isNaN(Date.parse(value));

  return true;
}
