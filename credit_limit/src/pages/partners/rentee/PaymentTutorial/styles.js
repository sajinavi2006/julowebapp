import styled from "@emotion/styled";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";

export const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    borderTop: 0,
    borderLeft: 0,
    borderRight: 0,
    boxShadow: "none",
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

export const AccordionSummary = withStyles({
  root: {
    padding: 0,
    minHeight: "62px"
  },
})(MuiAccordionSummary);

export const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(1, 2),
  },
}))(MuiAccordionDetails);

export const BankTitle = styled.p`
  margin: 0;
  font-size: 14px;
  color: #5e5e5e;
  font-weight: 700;
  align-self: center;
`;

export const DetailWrapper = styled.div`
  li,
  b {
    font-size: 12px;
    color: #5e5e5e;
  }

  li {
    padding-left: 5px;
  }
`;

export const ImgBank = styled.img`
  width: 40px;
  object-fit: contain;
  margin-right: 25px;
`;
