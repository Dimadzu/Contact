import format from "date-fns/format";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { CopyToClickBoardText } from "../../component/copyClickKeyboard";
import { NATIONALITIES_HUMAN_NAME } from "../../contacts/nationality";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
export const ContactsTable = ({ data }) => {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Avatar</TableCell>
            <TableCell>Full Name</TableCell>
            <TableCell>Birthday</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Nationality</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((contact) => (
            <TableRow key={contact.login.uuid}>
              <TableCell component="th" scope="row">
                <Avatar alt="" src={contact.picture.thumbnail} />
              </TableCell>
              <TableCell>
                {contact.name.title} {contact.name.first} {contact.name.last}
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2">
                  {format(new Date(contact.dob.date), "MM/dd/yyyy")}
                </Typography>
                <Typography variant="subtitle1">
                  {contact.dob.age} years
                </Typography>
              </TableCell>
              <TableCell>
                <CopyToClickBoardText text={contact.email} />
              </TableCell>
              <TableCell>
                <CopyToClickBoardText text={contact.phone} />
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2">
                  {contact.location.country}
                </Typography>
                <Typography variant="subtitle2">
                  {contact.location.city}, {contact.location.street.name}{" "}
                  {contact.location.street.number}
                </Typography>
              </TableCell>
              <TableCell>{NATIONALITIES_HUMAN_NAME[contact.nat]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
  //return<div><h3>{data[0].name.first}</h3></div>
};
