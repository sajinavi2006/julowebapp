import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";

export const StyledAccordion = withStyles({
    root: {
      border: "1px solid #E0E0E0",
      borderRadius: '16px',
    },
  })(MuiAccordion);
