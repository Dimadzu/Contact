import { useCallback, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import { useCopyToClipboard } from "react-use";
import Tooltip from "@material-ui/core/Tooltip";
import { Button } from "@material-ui/core";
const useStyles = makeStyles({
  root: {
    cursor: "pointer",
  },
  copyIcons: {
    color: "#00BFFF",
    marginRight: "8px",
  },
});
const STATUS_COPY = {
  COPY: "copy",
  COPIED: "copied",
};
const STATUS_BY_TITLE = {
  [STATUS_COPY.COPY]: "Copy",
  [STATUS_COPY.COPIED]: "Copied",
};
export const CopyToClickBoardText = ({ text }) => {
  const classes = useStyles();
  const [, copyToClipboard] = useCopyToClipboard();
  const [statusCopy, setStatusCopy] = useState(STATUS_COPY.COPY);
  // const getToolTipTitle=()=>{
  //   switch(statusCopy){
  //     case "copy":
  //       return "Copy";
  //     case "copied":
  //       return "Copied";
  //     default:
  //       return "";
  //   }
  // };
  const onClickCopy = useCallback(() => {
    copyToClipboard(text);
    setStatusCopy(STATUS_COPY.COPIED);
  }, [copyToClipboard, text]);
  const onMouseLiveCopy = useCallback(() => {
    setStatusCopy(STATUS_COPY.COPY);
  }, [setStatusCopy]);

  return (
    <Tooltip title={STATUS_BY_TITLE[statusCopy]} aria-label="add" arrow>
      <Button
        className={classes.root}
        onClick={() => onClickCopy(text)}
        onMouseLeave={onMouseLiveCopy}
      >
        <FileCopyOutlinedIcon className={classes.copyIcons} fontSize="small" />
        {text}
      </Button>
    </Tooltip>
  );
};

CopyToClickBoardText.propTypes = {
  text: PropTypes.string.isRequired,
};
