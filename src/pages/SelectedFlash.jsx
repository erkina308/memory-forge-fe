import { useLocation } from "react-router-dom";
import FlippableCard from "../components/FlippableCard";
import Nav from "../components/Nav";

export default function SelectedFlash() {
  const location = useLocation();

  return (
    <section>
      <Nav />
      <div className="selected_card_page">
        <FlippableCard card={location.state.selectedCard} />
      </div>
    </section>
  );
}
