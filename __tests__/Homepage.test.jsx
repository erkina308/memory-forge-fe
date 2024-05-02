import { render, screen, fireEvent } from "@testing-library/react";
import Homepage from "../src/pages/Homepage";

test("loads the homepage screen", () => {
  //set up
  const { getByTestId } = render(<Homepage />);

  //declaration
  const homepage = getByTestId("homepage");

  //assertion
  expect(homepage).toBeInTheDocument();
});
