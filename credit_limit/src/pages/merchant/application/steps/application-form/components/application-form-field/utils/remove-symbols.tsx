function removeSymbols(
  e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
) {
  const inputValue = e.target.value;

  e.target.value = inputValue.replace(/[^a-zA-Z0-9/.\s]/g, '');
}

export default removeSymbols;
