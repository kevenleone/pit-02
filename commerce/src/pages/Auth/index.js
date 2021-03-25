import React, { useState } from "react";

import ClayLayout from "@clayui/layout";
import ClayForm, { ClayInput } from "@clayui/form";
import ClayButton from "@clayui/button";
import axios from "../../utils/axios";
import ClayDatePicker from "@clayui/date-picker";
import { toast } from "react-toastify";

const FormSignUp = ({ form, onChange }) => (
  <ClayLayout.Row>
    <ClayLayout.Col size={6}>
      <ClayForm.Group>
        <label>First Name</label>
        <ClayInput
          type="text"
          name="firstName"
          value={form.firstName}
          onChange={onChange}
        />
      </ClayForm.Group>
    </ClayLayout.Col>
    <ClayLayout.Col size={6}>
      <ClayForm.Group>
        <label>Last Name</label>
        <ClayInput
          type="text"
          name="lastName"
          value={form.lastName}
          onChange={onChange}
        />
      </ClayForm.Group>
    </ClayLayout.Col>
    <ClayLayout.Col size={6}>
      <ClayForm.Group>
        <label>Birthday</label>
        <ClayDatePicker
          value={form.birthday}
          placeholder="YYYY-MM-DD"
          years={{
            end: new Date().getFullYear(),
            start: 1950,
          }}
          onValueChange={(value) =>
            onChange({
              target: { value, name: "birthday" },
            })
          }
        />
      </ClayForm.Group>
    </ClayLayout.Col>
    <ClayLayout.Col size={6}>
      <ClayForm.Group>
        <label>Phone</label>
        <ClayInput
          type="text"
          name="phone"
          value={form.phone}
          onChange={onChange}
        />
      </ClayForm.Group>
    </ClayLayout.Col>
    <ClayLayout.Col size={12}>
      <ClayForm.Group>
        <label>Email</label>
        <ClayInput
          type="email"
          name="email"
          value={form.email}
          onChange={onChange}
        />
      </ClayForm.Group>
    </ClayLayout.Col>
  </ClayLayout.Row>
);

const FormSignIn = ({ form, onChange }) => (
  <>
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
  </>
);
const Auth = ({ history }) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    birthday: "",
    login: "",
    phone: "",
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
      if (isLogin) {
        const response = await axios.post("/signin", {
          login: form.login,
          password: form.password,
        });

        localStorage.setItem("@token", response.data.token);

        toast.info("Logged with success");

        history.push("/product");
      } else {
        await axios.post("/user", form);

        toast.info("Account created with success");

        setIsLogin(true);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <ClayLayout.Container className="mt-4">
      <ClayForm onSubmit={onSubmit}>
        <h1 className="mb-4">{isLogin ? "Sign In" : "Sign Up"}</h1>

        {!isLogin && <FormSignUp onChange={onChange} form={form} />}

        <FormSignIn onChange={onChange} form={form} />

        <ClayButton
          style={{ marginLeft: -15 }}
          displayType="link"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Sign Up" : "Sign In"}
        </ClayButton>

        <div className="mt-4">
          <ClayButton type="submit">
            {isLogin ? "Sign In" : "Sign Up"}
          </ClayButton>
        </div>
      </ClayForm>
    </ClayLayout.Container>
  );
};

export default Auth;
