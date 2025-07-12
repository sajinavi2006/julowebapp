import { css } from '@emotion/react';

export const dragDropMultipleListCx = css`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-column-gap: 16px;
  grid-row-gap: 16px;

  width: 100%;

  .drag-drop-cx {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    border: 2px dashed #66cdf6;
    border-radius: 0.5rem;
    background: #b2e6fa;

    text-align: center;

    &.drag-drop-error {
      border: 2px dashed #db4d3d;
    }
  }

  .input-file-multiple {
    height: 120px;
    min-height: 120px;
  }

  .drag-drop-image-uploaded {
    width: fit-content;

    img {
      width: 191px;
      border-radius: 0.5rem;
      height: 120px;

      object-fit: cover;
    }
  }

  .icon-delete {
    position: absolute;
    top: 0;
    right: 0;

    width: 24px;
    height: 24px;
    margin-right: 4px;
    margin-top: 4px;

    cursor: pointer;
  }

  .multiple-files-scroll-x {
    display: flex;

    width: 100%;
    margin-left: 0.5rem;

    overflow-x: scroll;
  }

  .image-upload-wrapper {
    position: relative;

    .image-upload-file {
      width: 100%;
      height: 120px;
      border-radius: 0.5rem;

      object-fit: cover;
    }

    .document-upload-file {
      display: flex;
      align-items: center;
      justify-content: center;

      width: 100%;
      height: 120px;
      border-radius: 0.5rem;
      background-color: #f5f5f5;
      border: 1px solid #e0e0e0;
      padding: 0.25rem;

      text-align: center;
      color: #404040;

      .document-upload-text {
        max-width: 100px;
        padding-left: 0.25rem;

        text-overflow: ellipsis;
        text-wrap: nowrap;

        overflow: hidden;
      }
    }
  }

  /* Small Device */
  @media (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);

    .icon-delete {
      position: absolute;
      top: 0;
      right: 0;

      width: 24px;
      height: 24px;
      margin-right: 0.5rem;
      margin-top: 0.5rem;

      cursor: pointer;
    }
  }
`;
