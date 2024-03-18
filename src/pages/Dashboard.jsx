import Nav from "../components/Nav";

export default function Dashboard() {
  return (
    <section id="dashboard">
      <header className="dashboard-header">
        <Nav />
      </header>
      <div className="dashboard-sidebar">
        <h1 className="dashboard-title">Memory Forge</h1>
        <button className="dashboard-logout-button">Logout</button>
      </div>
      <div className="dashboard-main-body">
        <div className="dashboard-card">Create a flashcard</div>
        <div className="dashboard-card">Create a quiz</div>
        <div className="dashboard-card">Create a study plan</div>
        <div className="dashboard-card">Go to flashcards</div>
        <div className="dashboard-card">Go to quizzes</div>
        <div className="dashboard-card">Go to study plan</div>
      </div>
    </section>
  );
}
