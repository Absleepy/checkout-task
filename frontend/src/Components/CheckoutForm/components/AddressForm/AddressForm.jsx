import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { State, City } from "country-state-city";
import styles from "./AddressForm.module.css";
const AddressForm = ({ handleAddressSubmit }) => {
  const [hideSubBtn, setHideSubBtn] = useState(false);
  const [values, setValues] = useState({
    fullName: "",
    phoneNumber: "",
    selectedState: "",
    email: "",
    selectedCity: "",
    cities: [],
  });

  const [errors, setErrors] = useState({
    fullName: false,
    phoneNumber: false,
    email: "",
    selectedState: false,
    selectedCity: false,
  });

  const $states = State.getStatesOfCountry("US");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    setHideSubBtn(false);
  };
  const handleStateSelectChange = (e) => {
    let index = e.target.selectedIndex;
    const stateCode = $states[index].isoCode;
    const cities = City.getCitiesOfState("US", stateCode);

    setValues({
      ...values,
      selectedState: e.target.value,
      cities,
    });
    setHideSubBtn(false);
  };
  const handleCitySelectChange = (e) => {
    setValues({
      ...values,
      selectedCity: e.target.value,
    });
    setHideSubBtn(false);
  };

  function validEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.fullName === "") {
      setErrors({
        ...errors,
        fullName: true,
      });
    } else if (!validEmail(values.email)) {
      setErrors({
        ...errors,
        email: true,
      });
    } else if (
      values.phoneNumber === "" ||
      values.phoneNumber.length > 12 ||
      errors.phoneNumber.length < 9
    ) {
      setErrors({
        ...errors,
        phoneNumber: true,
      });
    } else if (values.selectedState === "") {
      setErrors({
        ...errors,
        selectedState: true,
      });
    } else if (values.cities.length && values.selectedCity === "") {
      setErrors({
        ...errors,
        selectedCity: true,
      });
    } else {
      setErrors({
        ...errors,
        fullName: false,
        phoneNumber: false,
        selectedState: false,
        selectedCity: false,
        email: false,
      });

      setHideSubBtn(true);

      handleAddressSubmit(values);
    }
    console.log(errors);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h4>Step1: Address</h4>
      <div className={styles.inputContainer}>
        <TextField
          error={errors.fullName}
          className={styles.w100}
          helperText={errors.fullName && "Invalid Full Name."}
          label="Full Name"
          onChange={handleChange}
          name="fullName"
          value={values.fullName}
          variant="outlined"
        />
      </div>
      <div className={styles.inputContainer}>
        <TextField
          className={styles.w100}
          label="Email"
          required
          error={errors.email}
          helperText={errors.email && "Invalid Email."}
          onChange={handleChange}
          name="email"
          value={values.email}
          variant="outlined"
        />
      </div>
      <div className={styles.inputContainer}>
        <TextField
          className={styles.w100}
          label="Phone Number"
          error={errors.phoneNumber}
          helperText={errors.phoneNumber && "Invalid Phone Number."}
          onChange={handleChange}
          name="phoneNumber"
          value={values.phoneNumber}
          variant="outlined"
        />
      </div>
      <div className={styles.inputContainer}>
        <select
          style={{
            pointerEvents: "none",
          }}
          disabled
          className={styles.select}
          value="United States"
        >
          <option value="United States">United States</option>
        </select>
      </div>

      <div className={styles.inputContainer}>
        <select
          className={styles.select}
          style={{ borderColor: errors.selectedState && "red" }}
          value={values.selectedState}
          onChange={handleStateSelectChange}
        >
          {$states?.map((state, index) => (
            <>
              {index === 0 && (
                <option key="state123" selected>
                  Select State
                </option>
              )}
              <option
                key={state?.isoCode}
                id={state.isoCode}
                value={state.name}
              >
                {state.name}
              </option>
            </>
          ))}
        </select>
      </div>
      <div className={styles.inputContainer}>
        <select
          style={{ borderColor: errors.selectedCity && "red" }}
          className={styles.select}
          value={values.selectedCity}
          onChange={handleCitySelectChange}
        >
          {values?.cities?.map((city, index) => (
            <>
              {index === 0 && (
                <option key="city123" selected>
                  Select city
                </option>
              )}
              <option key={city?.name} value={city.name}>
                {city.name}
              </option>
            </>
          ))}
        </select>
      </div>
      {!hideSubBtn && (
        <button className={styles.btn} type="submit">
          Submit
        </button>
      )}
    </form>
  );
};

export default AddressForm;
