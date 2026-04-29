import WorkspaceSelector from "./WorkspaceSelector";
import "./Home.css";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import { useCurrentUserStore } from "../../modules/auth/current-user.state";
import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Workspace } from "../../modules/workspaces/workspace.entity";
import { workspaceRepository } from "../../modules/workspaces/workspace.repository";
import { channelRepository } from "../../modules/channels/channel.repository";
import type { Channel } from "../../modules/channels/channel.entitiy";

function Home() {
  const { currentUser } = useCurrentUserStore();
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [channels, setChannels] = useState<Channel[]>([]);
  const params = useParams();
  const { workspaceId } = params;
  const selectedWorkspace = workspaces.find(
    (workspace) => workspace.id == workspaceId,
  );

  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        const workspaces = await workspaceRepository.find();
        setWorkspaces(workspaces);
      } catch (error) {
        console.error("ワークスペースの取得に失敗しました", error);
      }
    };
    fetchWorkspaces();
  }, []);

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const channels = await channelRepository.find(workspaceId!);
        setChannels(channels);
      } catch (error) {
        console.error("チャンネルの取得に失敗しました", error);
      }
    };
    fetchChannels();
  }, [workspaceId]);

  if (currentUser == null) return <Navigate to="/signin" />;
  return (
    <div className="slack-container">
      <WorkspaceSelector
        workspaces={workspaces}
        selectedWorkspaceId={workspaceId!}
      />
      {selectedWorkspace != null ? (
        <>
          <Sidebar selectedWorkspace={selectedWorkspace} />
          <MainContent />
        </>
      ) : (
        <div className="sidebar" />
      )}
    </div>
  );
}

export default Home;
