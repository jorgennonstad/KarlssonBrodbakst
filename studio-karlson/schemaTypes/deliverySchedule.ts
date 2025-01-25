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
        description: "Legg til spesielle dager hvor det er levering. feks. helligdager.",
      },
      {
        name: "blackoutDays",
        title: "Dager uten levering",
        type: "array",
        of: [{ type: "date" }],
        description: "Legg til dager hvor det ikke er levering. så vil det ikke være mulig å bestille noe til disse dagene.",
      },
    ],
  };
  