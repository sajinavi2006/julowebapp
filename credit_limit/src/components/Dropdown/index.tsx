import React, { useState, useEffect } from 'react';
import {
  chevronImage,
  dropdownItem,
  wrapperDropdownMenu,
  StyledDropdown,
} from './styles';
import ChevronDown from '../../assets/img/icon/ic-chevron_down.svg';
import loading from '../../assets/img/loading.gif';
import {
  background,
  color,
  flexGrow,
  fontSize,
  fontStyle,
} from '../../assets/css/stylesValue';
import { textCenter } from '../../assets/css/stylesFix';

interface Props {
  isLoading?: boolean;
  disabled?: boolean;
  onSelect?: (value: { [key: string]: string }) => void;
  options: { title?: string }[];
  placeholder?: string;
  placeholderPosition?: 'top' | 'center' | 'bottom';
}

const Dropdown: React.FC<Props> = ({
  disabled,
  isLoading = true,
  options = [],
  onSelect,
  placeholder = 'Pilih Dokumen',
  placeholderPosition = 'center',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (disabled) {
      setIsOpen(false);
    }
  }, [disabled]);

  const handleClickDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickDropdownMenu = (value: { [key: string]: string }) => {
    if (onSelect) {
      onSelect(value);
    }
    setIsOpen(!isOpen);
  };
  return (
    <>
      <StyledDropdown
        disabled={disabled}
        backgroundColor={'transparent'}
        isOpen={isOpen}
        position={placeholderPosition}
        onClick={() => !disabled && handleClickDropdown()}
      >
        <div className={flexGrow(1)}>
          {isLoading ? (
            <img src={loading} width='25px' height='25px' />
          ) : (
            placeholder
          )}
        </div>
        <img
          src={ChevronDown}
          className={`${chevronImage(isOpen)}`}
          alt='dropdown'
        />
      </StyledDropdown>
      {!disabled && (
        <div
          className={`${wrapperDropdownMenu(isOpen)} ${
            !options.length && background('#eee')
          }`}
        >
          {options.length ? (
            options?.map((item, index) => (
              <div
                key={index}
                className={`${dropdownItem} ${fontSize(14)} ${color(
                  '#5e5e5e',
                )}`}
                onClick={() => handleClickDropdownMenu(item)}
              >
                {item?.title}
              </div>
            ))
          ) : (
            <div
              className={`${textCenter} ${fontSize(12)} ${fontStyle(
                'italic',
              )} ${color('#ccc')}`}
            >
              No items
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Dropdown;
