import React, { Fragment } from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import "index.scss";

import Button from "components/Button.jsx";
import DayList from 'components/DayList.jsx';
import DayListItem from "components/DayListItem.jsx";
import InterviewerList from "components/InterviewerList";

import Appointment from "components/Appointment/index.js";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Confirm from "components/Appointment/Confirm";
import Status from "components/Appointment/Status";
import Error from "components/Appointment/Error";
import Form from "components/Appointment/Form";

//dummy data file
import days from '../src/data/days';
import InterviewerListItem from "components/InterviewerListItem";
// const days = require('../src/data/days') //this does not work

storiesOf("Button", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Base", () => <Button>Base</Button>)
  .add("Confirm", () => <Button confirm>Confirm</Button>)
  .add("Danger", () => <Button danger>Cancel</Button>)
  .add("Clickable", () => (
    <Button clickable onClick={action("button-clicked")}>Clickable</Button>
  ))
  .add("Disabled", () => (
    <Button disabled onClick={action("button-clicked")}>
      Disabled
    </Button>
  ));


storiesOf("DayListItem", module) //Initiates Storybook and registers our DayListItem component
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  }) // Provides the default background color for our component
  .add("Unselected", () => <DayListItem name="Monday" spots={5} />) // To define our stories, we call add() once for each of our test states to generate a story
  .add("Selected", () => <DayListItem name="Monday" spots={5} selected />)
  .add("Full", () => <DayListItem name="Monday" spots={0} />)
  .add("Clickable", () => (
    <DayListItem name="Tuesday" onChange={action("setDay")} spots={5} /> // action() allows us to create a callback that appears in the actions panel when clicked
  ));


storiesOf("DayList", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
  })
  .add("Monday", () => (
    <DayList days={days} day={"Monday"} onChange={action("setDay")} />
  ))
  .add("Tuesday", () => (
    <DayList days={days} day={"Tuesday"} onChange={action("setDay")} />
  ))
  .add("Wednesday", () => (
    <DayList days={days} day={"Wednesday"} onChange={action("setDay")} />
  ));

const interviewer = {
  id: 1,
  name: "Sylvia Palmer",
  avatar: "https://i.imgur.com/LpaY82x.png"
};

storiesOf("InterviewerListItem", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Unselected", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
    />
  ))
  .add("Selected", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected
    />
  ))
  .add("Clickable", () => (
    <InterviewerListItem
      name={interviewer.name}
      avatar={interviewer.avatar}
      onChange={() => action("setInterviewer")(interviewer.id)}
    />
  ));
//  .add("Clickable", () => (
//   <InterviewerListItem
//     id={interviewer.id}
//     name={interviewer.name}
//     avatar={interviewer.avatar}
//     setInterviewer={action("setInterviewer")}
//   />
// ));

const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
];

storiesOf("InterviewerList", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Initial", () => (
    <InterviewerList
      interviewers={interviewers}
    />
  ))
  .add("Selected", () => (
    <InterviewerList
      interviewers={interviewers}
      value={3}
    />

  ))
  .add("Clickable", () => (
    <InterviewerList
      interviewers={interviewers}
      onChange={action("setInterviewer")}
    />
  ));

storiesOf("Appointment", module)
  .addParameters({
    backgrounds: [{ name: "white", value: "#fff", default: true }]
  })
  .add("Appointment", () => <Appointment />)
  .add("Appointment with Time", () => <Appointment time="12pm" />)
  .add("Header", () => <Header time="12pm" />)
  .add("Empty", () => <Empty
    onAdd={action("setInterview")}
    time="12pm" />)
  .add("Show", () => <Show
    student="Lydia Miller-Jones"
    interviewer={interviewer}
    onEdit={action("Edit")}
    onDelete={action("Delete")}
  />)
  .add("Confirm", () => <Confirm
    onCancel={action("Cancel")}
    onConfirm={action("Confirm")}
    message="Delete the appointment?"
  />)
  .add("Status", () => <Status
    message="Deleting..."
  />)
  .add("Error", () => <Error
    message="Could not delete appointment."
  />)
  .add("Edit Form", () => <Form
    student='AJ'
    interviewer={3}
    interviewers={interviewers}
    onSave={() => action("Save")(interviewer.id)}
    onCancel={() => action("Cancel")(interviewer.id)}
  />)
  .add("Create Form", () => <Form
    interviewers={interviewers}
    onSave={action("Save")}
    onCancel={action("Cancel")}
  // onChange={action("setInterviewer")}
  />)
  .add("Appointment Empty", () => (
    <Fragment>
      <Appointment id={1} time="4pm" />
      <Appointment time="5pm" />
    </Fragment>
  ))
  .add("Appointment Booked", () => (
    <Fragment>
      <Appointment time="11am" />
      <Appointment time="12pm" />
      <Appointment
        id={1}
        time="1pm"
        interview={{ student: "Lydia Miller-Jones", interviewer }}
      />
      <Appointment time="4pm" />
      <Appointment time="5pm" />
      <Appointment time="6pm" />
    </Fragment>
  ));


