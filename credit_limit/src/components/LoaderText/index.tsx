import React, { useMemo } from 'react';
import { Div } from 'assets/css/styled';
import loading from 'assets/img/loading.gif';

import { StyledImage } from './styles';
import { Props } from './type';

const LoaderText: React.FC<Props> = ({ image, isLoading, isSpin, text, width }) => {
  const memoizeImage = useMemo(() => {
    return image;
  }, [image]);

  return (
    <Div>
      {text ? (
        <Div display='flex' justifyContent='center' alignItems='center'>
          <Div opacity={isLoading ? 0 : 1}>{text}</Div>
          {isLoading ? (
            <Div position='absolute'>
              <StyledImage
								isSpin={isSpin}
								src={memoizeImage}
								width={width}
								height='100%'
							/>
            </Div>
          ) : null}
        </Div>
      ) : (
        <Div display='flex' justifyContent='center' alignItems='center'>
          <StyledImage
            isSpin={isSpin}
            src={memoizeImage}
            width={width}
            height='100%'
          />
        </Div>
      )}
    </Div>
  );
};

LoaderText.defaultProps = {
  image: loading,
  isLoading: false,
  isSpin: false,
  width: '16',
};

export default LoaderText;
