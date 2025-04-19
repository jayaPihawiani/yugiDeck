import Spinner from "react-bootstrap/Spinner";

const SpinLoading = () => {
  return (
    <div
      className="container-fluid vh-100 d-flex justify-content-center align-items-center position-fixed"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.596)", zIndex: 1050 }}
    >
      <Spinner animation="grow" variant="light" />
    </div>
  );
};

export default SpinLoading;
