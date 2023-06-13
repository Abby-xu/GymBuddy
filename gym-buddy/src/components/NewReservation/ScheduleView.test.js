import React from "react";
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from "@testing-library/react";
import ScheduleView from "./ScheduleView";

const blockedTime = ["8:00-8:30", "14:30-15:00"];
let selectedTimeBlock = null;
const handleTimeBlockChange = (startTime, endTime) => {
  selectedTimeBlock = `${startTime}-${endTime}`;
};

describe("ScheduleView", () => {
  it("Unit test: should render Schedule Your Time text", () => {
    render(<ScheduleView blockedTime={blockedTime} selectedTimeBlock={selectedTimeBlock} handleTimeBlockChange={handleTimeBlockChange}/>);
    const text = screen.getByText("Schedule Your Time");
    expect(text).toBeInTheDocument();
  });



});
