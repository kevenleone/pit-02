import React from "react";
import ClayButton from "@clayui/button";
import ClayModal from "@clayui/modal";

const ModalComponent = ({
  title,
  observer,
  visible,
  children,
  onClose,
  submitText,
  onSubmit,
  size = "lg",
}) => {
  return (
    <>
      {visible && (
        <ClayModal observer={observer} size={size}>
          <ClayModal.Header>{title}</ClayModal.Header>
          <ClayModal.Body>{children}</ClayModal.Body>
          <ClayModal.Footer
            first={
              <ClayButton.Group spaced>
                <ClayButton onClick={onClose} displayType="secondary">
                  Cancel
                </ClayButton>
              </ClayButton.Group>
            }
            last={<ClayButton onClick={onSubmit}>{submitText}</ClayButton>}
          />
        </ClayModal>
      )}
    </>
  );
};

export default ModalComponent;
