import React from 'react'
const Modal = ({modalTitle, modalBody,displayModal,modalFooter}) => {
    return (
        <>
<section className="modal-section"style={displayModal?null:{display:"none"}}>
<section className="modal-contents"> 
<section className="modal-header"><h1>{modalTitle}</h1> </section>
<section className="modal-body">{modalBody}
</section>
<section className="modal-footer">{modalFooter} </section>
</section>
</section>
        </>
    )
}
export default Modal