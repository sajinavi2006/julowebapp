export interface FormActionProps {
  onSnackbarClose: () => void;
  showSnackbar: {
    isOpen: boolean;
    message: string;
  };
}
