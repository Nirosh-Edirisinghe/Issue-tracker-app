const statusStyles = {
    Open: "bg-blue-200 text-blue-700",
    Inprogress: "bg-yellow-200 text-yellow-700",
    Resolved: "bg-green-200 text-green-700",
    Closed: "bg-red-200 text-red-700",
  };

  const priorityStyles = {
  High: "bg-red-100 text-red-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Low: "bg-green-100 text-green-700",
};

const statusOptions = [
  { label: "Open", value: "Open" },
  { label: "In Progress", value: "Inprogress" },
  { label: "Resolved", value: "Resolved" },
  { label: "Closed", value: "Closed" },
];

  export { statusStyles, priorityStyles, statusOptions}