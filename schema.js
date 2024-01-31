export const schema = {
  eventSeries: Joi.string().uppercase().valid("FE", "XE"),
  eventType: Joi.string().valid("Race", "Test", "Sim", "Dyno"),
  eventSeason: Joi.number().integer().min(1).max(9999),
  eventName: Joi.string().regex(
    new RegExp("S[0-9]{2}[R|T][0-9]{2}_[a-zA-Z]{3}")
  ),
  eventTimeZone: Joi.string(),
  eventStartDate: Joi.date().min("1-1-1970"),
  eventEndDate: Joi.date().min(Joi.ref("eventStartDate")),

  sessionName: Joi.string(),
  sessionType: Joi.string().valid(
    "Test",
    "Free Practice",
    "Qualifying",
    "Race"
  ),
  sessionStartDateTime: Joi.date()
    .min(Joi.ref("eventStartDate"))
    .max(Joi.ref("eventEndDate")),
  sessionEndDateTime: Joi.date()
    .min(Joi.ref("sessionStartDate"))
    .max(Joi.ref("eventEndDate")),

  customJson: Joi.object(),
};
