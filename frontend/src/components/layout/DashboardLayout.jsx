import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Player from "./Player";

export default function DashboardLayout({
  children,
  currentSong,
  onNext,
  onPrev
}) {
  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="dashboard-main">
        <Topbar />
        <div className="dashboard-content">{children}</div>

        <Player
          song={currentSong}
          onNext={onNext}
          onPrev={onPrev}
        />
      </div>
    </div>
  );
}

