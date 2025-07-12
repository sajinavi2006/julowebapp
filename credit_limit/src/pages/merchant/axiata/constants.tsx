import { MenuProps } from 'new-components/layouts/merchant/components/sidebar';
import RupiahCoin from 'new-components/shapes/RupiahCoin';

export const LOAN_DRAFT = 209;
export const LOAN_INACTIVE = 210;
export const LOAN_LENDER_APPROVAL = 211;
export const LOAN_CURRENT = 220;
export const LOAN_APPROVED = 212;
export const LOAN_PAID_OFF = 250;
export const LOAN_CANCELLED = 216;
export const LOAN_REJECTED = 219;

export const LOAN_STATUS = {
  LOAN_APPLIED: [LOAN_DRAFT, LOAN_INACTIVE, LOAN_LENDER_APPROVAL, LOAN_APPROVED],
  LOAN_ACTIVE: [
    LOAN_CURRENT,
    230,
    231,
    232,
    233,
    234,
    235,
    236,
    237,
    238,
    239,
    240,
    241,
  ],
  LOAN_HISTORY: [LOAN_PAID_OFF, 216, 219],
};

export const MENUS: MenuProps[] = [
  {
    name: 'pinjaman',
    label: 'Pinjaman',
    icon: ({ isHovered, isSelected }) => (
      <RupiahCoin
        {...((isHovered || isSelected) && {
          fill: '#ffffff',
        })}
      />
    ),
    href: '',
  },
];
