import "../Backgrounds.scss";
import cottage from "/assets/videos/optimized_cottage.mp4";

export const Cottage = () => {
  return (
    <div className="background-container">
      <video autoPlay muted loop id="cottageVideo">
        <source src={cottage} type="video/mp4" />
      </video>
    </div>
  );
};
