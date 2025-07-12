export default (errors, scope, field, value) => {
  const i = errors.items.findIndex(
    x =>
    x.field === `${scope}.${field}` &&
    x.scope === `${scope}` &&
    x.msg === `${field} tidak valid`
  );
  //check 08
  const check08Suffix = value.substring(0, 2) === "08";

  if (!check08Suffix && i === -1) {
    // const ixx = errors.items.findIndex(
    //   x => x.scope == scope && x.field == field
    // );
    // errors.items[ixx].msg = "hadkad";
    // console.log(ixx);
    // console.log(errors.items);
    //console.log(9999999);
    // errors.add({
    //   scope: `${scope}`,
    //   field: `${scope}.${field}`,
    //   msg: `${field} tidak valid`
    // });
    // errors.items.push({
    //   scope: `${scope}`,
    //   field: `${scope}.${field}`,
    //   msg: `${field} tidak valid`
    // });

    errors.add({
      scope: scope,
      field: field,
      msg: `${field} tidak valid`
    });

    // errors.items.push({
    //   scope: scope,
    //   field: `${scope}['${field}']`,
    //   msg: `${field} tidak valid`
    // });
    // console.log(888888888);
    // errors.items.push(errors[ixx]);
  } else if (check08Suffix && i !== -1) {
    errors.items.splice(i, 1);
  }
};
