import React from "react";
import ClayButton from "@clayui/button";
import ClayModal from "@clayui/modal";

const ModalComponent = ({ title, observer, visible, children, onClose }) => {
  return (
    <>
      {visible && (
        <ClayModal observer={observer} size="lg" status="info">
          <ClayModal.Header>{title}</ClayModal.Header>
          <ClayModal.Body>{children}</ClayModal.Body>
          <ClayModal.Footer
            first={
              <ClayButton.Group spaced>
                <ClayButton displayType="secondary">{"Secondary"}</ClayButton>
                <ClayButton displayType="secondary">{"Secondary"}</ClayButton>
              </ClayButton.Group>
            }
            last={<ClayButton onClick={onClose}>{"Primary"}</ClayButton>}
          />
        </ClayModal>
      )}
    </>
  );
};

export default ModalComponent;
