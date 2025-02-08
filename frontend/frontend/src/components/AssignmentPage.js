import React from "react";
import AssignmentUpload from "./AssignmentUpload";
import AssignmentList from "./AssignmentList";

const AssignmentPage = () => {
  return (
    <div>
      <h1>Assignment Management</h1>
      <AssignmentUpload />
      <AssignmentList />
    </div>
  );
};

export default AssignmentPage;
