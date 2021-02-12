import React from "react";
import { render, screen } from "@testing-library/react";
import { Contacts } from "../pages/Contact";

test(`contacts get data sucess`, () => {
  render(<Contacts />);
  screen.debug();
});
