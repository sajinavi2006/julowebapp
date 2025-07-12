/*
 * Replaces all non-digit characters (symbols and alphabets) with an empty string
 * Example:
 * Input = 12#45^
 *
 * The result will be 1245
 */
import { removeNonNumber } from '@julofinance/web-helpers/dist/number';

function handleNumericalInput(
  e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
) {
  const inputValue = e.target.value;

  e.target.value = removeNonNumber(inputValue);
}

export default handleNumericalInput;
