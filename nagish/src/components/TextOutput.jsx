// TextOutput.jsx
import { Card } from "react-bootstrap";

function TextOutput({ text }) {
  return (
    <Card className="custom-card p-4 border-0">
      <Card.Body>
        <h5 className="text-secondary mb-3">Converted Text</h5>
        <div className="p-3 bg-light rounded-3">
          <p className="fs-5 mb-0">{text || "Your converted text will appear here..."}</p>
        </div>
      </Card.Body>
    </Card>
  );
}

export default TextOutput;