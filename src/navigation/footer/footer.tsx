import React from "react";
import classes from "./footer.module.css";

import Container from "@mui/material/Container";
import Navlink from "../navlink/navlink";
import { CURRENT_YEAR } from "../../config";

const footer = () => {
  return (
    <Container maxWidth="sm">
      <footer className={classes.footer}>
        <div className={classes.links}>
          <Navlink link="/">Home</Navlink>
          <Navlink link="/auth">Auth</Navlink>
          <Navlink link="/gamelobby">GameLobby</Navlink>
          <Navlink link="/upload">Upload</Navlink>
        </div>
        <div className={classes.rights}>
          <p>@ {CURRENT_YEAR} All Rights Reserved</p>
          <p>Developed By LexSchool Dev</p>
        </div>
      </footer>
    </Container>
  );
};

export default footer;
