export default {
  name: "deliverySchedule",
  title: "Leveringsplan",
  type: "document",
  fields: [
    {
      name: "specialDeliveryDays",
      title: "Spesielle leveringsdager",
      type: "array",
      of: [{ type: "date" }],
      description: "Legg til spesielle dager hvor det er levering. f.eks. helligdager.",
    },
    {
      name: "blackoutDays",
      title: "Dager uten levering",
      type: "array",
      of: [{ type: "date" }],
      description: "Legg til dager hvor det ikke er levering. Det vil ikke være mulig å bestille noe til disse dagene.",
    },
    // New field to mark fully booked days
    {
      name: "fullyBookedDays",
      title: "Dager med fullt belegg",
      type: "array",
      of: [{ type: "date" }],
      description: "Legg til dager som er fullt booket og ikke kan akseptere flere bestillinger.",
    },
  ],
};
