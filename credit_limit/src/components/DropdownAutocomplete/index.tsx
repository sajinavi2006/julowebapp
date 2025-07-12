import React, { useState, useEffect, useRef } from 'react';
import { Div } from 'assets/css/styled';
import {
  dropdownItem,
  wrapperDropdownMenu,
  StyledDropdown,
  Error,
} from './styles';
import ChevronDown from 'assets/img/icon/ic-chevron_down.svg';
import loading from 'assets/img/loading.gif';
import {
  background,
  color,
  flexGrow,
  fontSize,
  fontStyle,
} from 'assets/css/stylesValue';
import { textCenter } from 'assets/css/stylesFix';

interface Props {
  disabled?: boolean;
  disabledInput?: boolean;
  onSelect?: (value: { [key: string]: string }) => void;
  options?: {
    id: string;
    title: string;
    description: string;
  }[];
  placeholder?: string;
  placeholderPosition?: 'top' | 'center' | 'bottom';
  error?: string;
  isLoading?: boolean;
  titleClass?: string;
  descriptionClass?: string;
  dropdownClass?: string;
  inputClass?: string;
  defaultValue?: { [key: string]: string };
}

// to use this the data options should have id and title. description is optional
const DropdownAutocomplete: React.FC<Props> = ({
  disabled,
  disabledInput,
  isLoading,
  options = [],
  onSelect,
  placeholder = 'Pilih Dokumen',
  placeholderPosition = 'top',
  titleClass,
  descriptionClass,
  dropdownClass,
  inputClass,
  defaultValue,
  error,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState(options);
  const [selected, setSelected] = useState(defaultValue || {});

  const handleClickDropdown = () => {
    if (disabled) return;

    if (inputRef.current) {
      if (isOpen) {
        inputRef.current.blur();
      } else {
        inputRef.current.focus();
      }
    }

    setIsOpen(!isOpen);
  };

  const handleClickDropdownMenu = (value: { [key: string]: string }) => {
    if (inputRef.current) inputRef.current.focus();
    setSelected(value);
    setInputValue(value.title);
    //reset filtered suggestion
    setSuggestions(options);

    if (onSelect) onSelect(value);
    setIsOpen((prev) => !prev);
  };

  const onInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (!disabledInput) {
      const userInput = (e.currentTarget as HTMLInputElement).value;
      const filteredSuggestions = options.filter(
        (suggestion) =>
          suggestion?.title?.toLowerCase().indexOf(userInput.toLowerCase()) >
          -1,
      );
      setInputValue(userInput);
      setSuggestions(filteredSuggestions);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (disabled) {
      setIsOpen(false);
    }
    setSuggestions(options);
  }, [disabled, options]);

  return (
    <Div ref={dropdownRef} position='relative' className={dropdownClass}>
      <StyledDropdown
        disabled={disabled}
        backgroundColor={'transparent'}
        isOpen={isOpen}
        position={placeholderPosition}
        onClick={handleClickDropdown}
        error={!!error && !isOpen}
      >
        <div className={flexGrow(1)}>
          <input
            type='text'
            value={inputValue}
            ref={inputRef}
            disabled={disabled}
            onChange={onInputChange}
            placeholder={placeholder}
            className={`${inputClass}`}
          />
        </div>
        <img style={{ paddingTop: '2px' }} src={ChevronDown} alt='dropdown' />
      </StyledDropdown>
      {error && !isOpen && <Error>{error}</Error>}

      {!disabled && (
        <div
          className={`${wrapperDropdownMenu(isOpen)} ${
            !suggestions.length && background('#eee')
          }`}
        >
          {!isLoading ? (
            suggestions.length ? (
              suggestions?.map((item, index) => {
                const isItemSelected = selected?.id === item?.id;
                return (
                  <div
                    key={index}
                    className={`${dropdownItem} ${fontSize(14)} ${
                      isItemSelected ? color('#fff') : color('#5e5e5e')
                    } ${isItemSelected ? background('#0f9be2') : ''}`}
                    onClick={() => handleClickDropdownMenu(item)}
                  >
                    <div className={`${titleClass}`}>{item?.title}</div>
                    {item?.description && (
                      <div className={`${descriptionClass}`}>
                        {item?.description}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div
                className={`${textCenter} ${fontSize(12)} ${fontStyle(
                  'italic',
                )} ${color('#ccc')}`}
              >
                No items
              </div>
            )
          ) : (
            <div
              className={`${textCenter} ${fontSize(12)} ${fontStyle(
                'italic',
              )} ${color('#ccc')}`}
            >
              <img src={loading} width='25px' height='25px' />
            </div>
          )}
        </div>
      )}
    </Div>
  );
};

export default DropdownAutocomplete;
