import React, { useState } from "react";
import ClayIcon from "@clayui/icon";
import ClaySticker from "@clayui/sticker";
import ClayDropDown from "@clayui/drop-down";
import { useHistory } from "react-router";

const NavigationOptions = () => {
  const [active, setActive] = useState(false);

  const history = useHistory()

  const onLogout = () => {};

  return (
    <ClayDropDown
      trigger={
        <div>
          <ClaySticker displayType="danger" size="lg">
            <ClayIcon symbol="user" />
          </ClaySticker>
        </div>
      }
      active={active}
      onActiveChange={setActive}
    >
      <ClayDropDown.Help>Welcome</ClayDropDown.Help>
      <ClayDropDown.ItemList>
        <ClayDropDown.Item onClick={() => history.push("/profile")}>
          profile
        </ClayDropDown.Item>
        <ClayDropDown.Item onClick={onLogout}>logout</ClayDropDown.Item>
      </ClayDropDown.ItemList>
    </ClayDropDown>
  );
};

export default NavigationOptions;
