import React from "react";

import { render, cleanup } from "@testing-library/react";

import DayListItem from "components/DayListItem";

afterEach(cleanup);

it("renders without crashing", () => {
  render(<DayListItem />);
});

it("renders 'no spots remaining' when there are 0 spots", () => {
  const { getByText } = render(<DayListItem name="Monday" spots={0} status={false}/>);
  expect(getByText("no spots remaining",{exact:false})).toBeInTheDocument();
});

it("renders '1 spot remaining' when there is 1 spot", () => {
  const { getByText } = render(<DayListItem name="Monday" spots={1} status={false} />);
  expect(getByText("1 spot remaining",{exact:false})).toBeInTheDocument();
});

it("renders '2 spots remaining' when there are 2 spots", () => {
  
  const { getByText } = render(<DayListItem name="Monday" spots={2} status={false} />);
  expect(getByText("2 spots remaining",{exact:false})).toBeInTheDocument();
});