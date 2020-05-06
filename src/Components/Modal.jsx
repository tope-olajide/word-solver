import React from "react";
/**
 * Game component
 * @param  {props} modalTitle - string
 * @param  {props} modalBody - string
 * @param  {props} displayModal - string
 * @param {props} modalFooter - string
 * @return {object} JSX - About component elements
 */
const Modal = ({ modalTitle, modalBody, displayModal, modalFooter }) => {
  return (
    <>
      <section
        className="modal-section"
        style={displayModal ? null : { display: "none" }}
      >
        <section className="modal-contents">
          <section className="modal-header">
            <h1>{modalTitle}</h1>{" "}
          </section>
          <section className="modal-body">{modalBody}</section>
          <section className="modal-footer">{modalFooter} </section>
        </section>
      </section>
    </>
  );
};
export default Modal;
