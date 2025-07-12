import styled from '@emotion/styled';
import { colsMax, colsMin } from 'assets/css/utils';

export const StyledDialogTnC = styled.div`
  position: fixed;
  ${(props) =>
    props.type !== 'form' && {
      top: '50%',
      left: '50%',
      transform: `translate(${'-50%'}, -50%)`,
      transition: 'transform 0.5s, left 0.5s',
      visibility: 'visible',
      opacity: '1',
    }}
  ${(props) =>
    props.type === 'form' && {
      left: '50%',
      bottom: '0',
      transform: `translate(-50%, ${props.isOpenAnimation ? '0%' : '100%'})`,
      transition: 'transform 0.5s',
    }}
    overflow: auto;
  display: flex;

  z-index: ${(props) => props.zIndex};
  justify-content: center;
  clear: both;
  align-items: ${(props) => {
    switch (props.position) {
      case 'top':
        return 'flex-start';

      case 'center':
        return 'center';

      case 'bottom':
        return 'flex-end';

      default:
        return 'center';
    }
  }};
  ${colsMin('small')} {
    min-width: ${(props) => props.maxWidth}px;
  }
  ${colsMax('small')} {
    min-width: 100%;
  }
  ${(props) => props.styles}
`;
