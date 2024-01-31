import { schema } from "./schema.js";

const formRef = document.getElementById("eventForm");
const buttonRef = document.getElementById("submitButton");

const userInput = {};

const validate = (event) => {
  // console.log(event);
  const valOptions = {
    abortEarly: false,
    allowUnknown: false,
    presence: "required",
  };

  if (!(event instanceof PointerEvent)) {
    userInput[event.target.name] = event.target.value;
    valOptions["presence"] = "optional";
  }

  Joi.validate(userInput, schema, valOptions, (errror, value) => {
    Object.keys(value).forEach((v) => {
      document.querySelector(`label[for="${v}"] + *`).classList.remove("error");
      document.querySelector(`label[for="${v}"] ~ p`).innerHTML = "";
    });

    if (errror) {
      errror.details.forEach((e) => {
        document
          .querySelector(`label[for="${e.context.key}"] + *`)
          .classList.add("error");
        document.querySelector(`label[for="${e.context.key}"] ~ p`).innerHTML =
          e.message;
      });
    }
  });
};

formRef.addEventListener("input", validate);
buttonRef.addEventListener("click", validate);
