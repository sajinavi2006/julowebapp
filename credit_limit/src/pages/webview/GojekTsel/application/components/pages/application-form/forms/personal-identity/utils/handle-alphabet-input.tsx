function handleAlphabetInput(
  e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
) {
  const inputValue = e.target.value;

  e.target.value = inputValue.replace(/[^a-zA-Z\s]/g, '');
}

export default handleAlphabetInput;
