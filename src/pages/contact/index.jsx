import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles, formatMs } from "@material-ui/core/styles";
import { useEffect, useState } from "react";

import { ContactsTable } from "../contactsTable/index";
import CircularProgress from "@material-ui/core/CircularProgress";
import ViewListIcon from "@material-ui/icons/ViewList";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Box from "@material-ui/core/Box";
import React from "react";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(3),
    },
    headContainer: {
      marginBottom: theme.spacing(3),
    },
    loader: {
      marginLeft: "50%",
    },
  })
);
const DATA_VIEW_MOD = {
  TABLE: "table",
  GRID: "grid",
};
const initionalDataViewMod = () => {
  return localStorage.getItem("dataViewMod") || DATA_VIEW_MOD.TABLE;
};

export const Contacts = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const classes = useStyles();
  const [dataViewMod, setDataViewMod] = useState(initionalDataViewMod());
  const [page, setPage] = useState(1);

  //функция для подключения к серверу
  useEffect(() => {
    const getContacts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://randomuser.me/api/?results=200" &&
            `https://randomuser.me/api/?page=${page}&results=10&seed=abc`
        );
        const { results, error } = await response.json();
        setData(results);
        console.log(results);

        if (error) {
          throw new Error(error);
        }
      } catch (e) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getContacts();
  }, [page]);

  const handleChangePage = (_, pageNumber) => {
    setPage(pageNumber);
  };

  const handleChangeViewMod = (_, nextView) => {
    setDataViewMod(nextView);
  };

  useEffect(() => {
    localStorage.setItem("dataViewMod", dataViewMod);
  }, [dataViewMod]);

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Grid>
        <Grid item xs={12} className={classes.headContainer}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h4" component="h1">
              Contacts
            </Typography>
            <ToggleButtonGroup
              value={dataViewMod}
              exclusive
              onChange={handleChangeViewMod}
            >
              <ToggleButton
                value={DATA_VIEW_MOD.TABLE}
                aria-label={DATA_VIEW_MOD.TABLE}
              >
                <ViewListIcon />
              </ToggleButton>
              <ToggleButton
                value={DATA_VIEW_MOD.GRID}
                aria-label={DATA_VIEW_MOD.GRID}
              >
                <ViewModuleIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Grid>
        <Grid item xs={12}>
          {(() => {
            if (isLoading) {
              return <CircularProgress className={classes.loader} />;
            }
            if (isError) {
              return <div>isError</div>;
            }
            if (dataViewMod === DATA_VIEW_MOD.TABLE) {
              return <ContactsTable data={data} />;
            }
            if (dataViewMod === DATA_VIEW_MOD.GRID) {
              return "Grid";
            }
            return null;
          })()}
          <Typography>Page: {page}</Typography>
          <Pagination
            count={10}
            color="primary"
            page={page}
            onChange={handleChangePage}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
