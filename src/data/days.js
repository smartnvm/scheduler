const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

// module.export(days) ---> node
// export const (days) ---> imported by React components
export default days;  //--> needed for Storybook to work