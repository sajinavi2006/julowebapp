export default (field, scope, errors) => {
  const i = errors.findIndex(
    x => x.field.toLowerCase() === field && x.scope === scope
  );
  if (i != -1) {
    errors.splice(i, 1);
  }
  return errors;
};
