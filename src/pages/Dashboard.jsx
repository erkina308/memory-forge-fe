import Nav from "../components/Nav";

export default function Dashboard() {
  return (
    <section id="dashboard">
      <header className="dashboard-header">
        <Nav />
      </header>
      <div className="dashboard-sidebar"></div>
      <div className="dashboard-main-body">
        <div className="dashboard-card"></div>
        <div className="dashboard-card"></div>
        <div className="dashboard-card"></div>
        <div className="dashboard-card"></div>
        <div className="dashboard-card"></div>
        <div className="dashboard-card"></div>
      </div>
    </section>
  );
}
