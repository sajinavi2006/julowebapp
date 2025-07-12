import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import back from '../assets/img/icon/ic-back-2.svg';
import { css } from '@emotion/css';
import { useUserContext } from '../providers/UserProvider';
import DialogInfo from './Dialog/DialogInfo';
import utils from '../utils';

const fillNone = css`
  fill: none;
`;
const circleBackground = css`
  stroke: #dbdfe2;
`;
const circleProgress = css`
  stroke: #00acf0;
  stroke-linecap: round;
  stroke-linejoin: round;
`;
const circleText = css`
  font-size: 12px;
  font-weight: bold;
`;

const DonutCustom = (props) => {
  const { sqSize, strokeWidth, percentage, textInside } = props;
  const radius = (sqSize - strokeWidth) / 2;
  const viewBox = `0 0 ${sqSize} ${sqSize} `;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * percentage) / 100;

  return (
    <svg width={sqSize} height={sqSize} viewBox={viewBox}>
      <circle
        className={`${fillNone} ${circleBackground}`}
        cx={sqSize / 2}
        cy={sqSize / 2}
        r={radius}
        strokeWidth={`${strokeWidth} px`}
      />
      <circle
        className={`${fillNone} ${circleProgress}`}
        cx={sqSize / 2}
        cy={sqSize / 2}
        r={radius}
        strokeWidth={`${strokeWidth} px`}
        transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
        style={{
          strokeDasharray: dashArray,
          strokeDashoffset: dashOffset,
        }}
      />
      <text
        className={circleText}
        x='50%'
        y='50%'
        dy='.3em'
        textAnchor='middle'
      >
        {`${textInside}`}
      </text>
    </svg>
  );
};

function Steps(props) {
  const { datas } = useUserContext();
  const [showDialogInfo, setShowDialogInfo] = useState(false);
  let pageHead = 'Identitas Diri';
  let progressLabel = '1 of 4';
  let percentage = 25;
  if (props.step === 2) {
    progressLabel = '2 of 4';
    pageHead = 'Informasi Keluarga';
    percentage = 50;
  } else if (props.step === 3) {
    progressLabel = '3 of 4';
    pageHead = 'Informasi Pekerjaan';
    percentage = 75;
  } else if (props.step === 4) {
    progressLabel = '4 of 4';
    pageHead = 'Keuangan';
    percentage = 100;
  }
  function goBack() {
    if (props.step === 2) {
      props.history.push({
        pathname: './personal_identity',
        state: { submitForm: false },
      });
    } else if (props.step === 3) {
      props.history.push('./family_information');
    } else if (props.step === 4) {
      props.history.push('./job_and_education');
    } else {
      setShowDialogInfo(true);
    }
  }

  const handleBack = ({ action, url }) => {
    if (action === 'redirect') {
      utils.store.set('approveNote', false);
      props.history.push({
        pathname: `/${datas.partner}/${url}`,
        state: { app: true, submitForm: false },
      });
    } else {
      setShowDialogInfo(false);
    }
  };

  return (
    <div className='row'>
      <div className='col-12 bordered-bottom-light registration-title pull-left'>
        <a onClick={() => goBack()} className='back-trigger'>
          <img src={back} alt='' />
        </a>
        <div className='registration-title__content ml-5'>
          <DonutCustom
            sqSize={60}
            percentage={percentage}
            strokeWidth={0.5}
            textInside={progressLabel}
          />
          <span className='registration-title__txt ml-3'>{pageHead}</span>
        </div>
      </div>
      <DialogInfo
        dialogData={props.dialogData}
        handleShowDialogInfo={setShowDialogInfo}
        showDialogInfo={showDialogInfo}
        handleClickDialogButton={handleBack}
      />
    </div>
  );
}

Steps.propTypes = {
  dialogData: PropTypes.any,
  step: PropTypes.number,
  history: PropTypes.object,
};

DonutCustom.propTypes = {
  sqSize: PropTypes.number,
  strokeWidth: PropTypes.number,
  percentage: PropTypes.number,
  textInside: PropTypes.string,
};

export default withRouter(Steps);
