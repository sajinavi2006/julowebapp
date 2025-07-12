function excludeKey<TData>(object: TData, excludeKey: (keyof TData)[]) {
  const cFieldValues = { ...object };

  for (const key of excludeKey) {
    delete cFieldValues[key];
  }

  return cFieldValues;
}

export default excludeKey;
