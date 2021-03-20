import React, { useState } from "react";

import ClayLayout from "@clayui/layout";
import ClayForm, { ClayInput } from "@clayui/form";
import ClayButton from "@clayui/button";
import axios from "../../utils/axios";

const Auth = () => {
  const [form, setForm] = useState({
    login: "",
    password: "",
  });

  const [isLogin, setIsLogin] = useState(true);

  const onChange = ({ target: { name, value } }) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
        const response = await axios.post('/signin', form);
        console.log(response.data);
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <ClayLayout.Container className="mt-4">
      <ClayForm onSubmit={onSubmit}>
        <ClayForm.Group>
          <label>Login</label>
          <ClayInput name="login" value={form.login} onChange={onChange} />
        </ClayForm.Group>
        <ClayForm.Group>
          <label>Password</label>
          <ClayInput
            type="password"
            name="password"
            value={form.password}
            onChange={onChange}
          />
        </ClayForm.Group>

        <ClayButton style={{marginLeft: -15}} displayType="link">Sign Up</ClayButton>

        <div className="mt-4">
          <ClayButton type='submit'>Login</ClayButton>
        </div>
      </ClayForm>
    </ClayLayout.Container>
  );
};

export default Auth;
