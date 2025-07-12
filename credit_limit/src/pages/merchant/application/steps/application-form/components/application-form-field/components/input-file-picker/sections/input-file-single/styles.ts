import { css } from '@emotion/react';

export const dragDropSingleListCx = css`
  .input-file-picker-wrapper {
    margin-top: 1rem;
  }

  .drag-drop-cx {
    width: 100%;
    height: 100%;
    min-height: 7.5rem;
    padding: 1.563rem;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    text-align: center;

    background: #b2e6fa;
    border: 0.125rem dashed #66cdf6;
    border-radius: 0.5rem;

    &.drag-drop-error {
      border: 0.125rem dashed #db4d3d;
    }
  }

  .drag-drop-image-uploaded {
    width: fit-content;

    img {
      width: 100%;
      height: 100%;
      max-width: 11.938rem;
      max-height: 7.5rem;

      border-radius: 0.5rem;

      object-fit: cover;
    }
  }

  .icon-delete {
    width: 100%;
    height: 100%;
    max-width: 1.5rem;
    max-height: 1.5rem;

    margin-right: 0.25rem;
    margin-top: 0.25rem;

    position: absolute;
    top: 0;
    right: 0;

    cursor: pointer;
  }

  .input-image-show {
    position: relative;
    width: fit-content;

    .input-single-image-preview {
      width: 100%;
      height: 100%;
      max-width: 11.938rem;
      max-height: 7.5rem;

      border-radius: 0.5rem;

      object-fit: cover;
    }
  }
`;
