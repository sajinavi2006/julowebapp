import { ChangeEvent, useState } from 'react';
import { StyledSliderContainer, StyledSlider } from './styles';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import _noop from '@julofinance/web-helpers/dist/fn/noop';
import { Div } from 'assets/css/styled';
import { SliderProps } from './type';

const Slider = (props: SliderProps) => {
  // Initialize Props
  const { value: _value = 0, data, marks = true, onChange = _noop } = props;
  // Initialize State
  const [value, setValue] = useState(0);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const index = e.target.value;
    setValue(Number(index));
    onChange(data[Number(index)]);
  }

  return (
    <StyledSliderContainer>
      <StyledSlider
        type='range'
        min={0}
        max={data.length - 1}
        step={1}
        value={_value ? _value : value}
        onChange={handleChange}
      />
      {marks && (
        <Div styles={{ display: 'flex', justifyContent: 'space-between' }}>
          {data.map((_, key: number) => (
            <Div key={key}>
              <FiberManualRecordIcon
                key={key}
                style={{ fontSize: 10, color: '#f0f0f0' }}
              />
            </Div>
          ))}
        </Div>
      )}
    </StyledSliderContainer>
  );
};

export default Slider;
