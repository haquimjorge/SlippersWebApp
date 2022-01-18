import FloatingLabel from "react-bootstrap/FloatingLabel";
import FormR from "react-bootstrap/Form";


function RowInputSelect({ label, ...props }) {
    return (
      <FloatingLabel label={label}>
        <FormR.Select {...props} size="sm" />
      </FloatingLabel>
    );
  }

  export default RowInputSelect