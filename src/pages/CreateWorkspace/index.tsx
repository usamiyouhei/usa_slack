import "../Signup/auth.css";
import CreateWorkspaceModal from "../Home/WorkspaceSelector/CreateWorkspaceModal";
import { useCurrentUserStore } from "../../modules/auth/current-user.state";
import { Navigate, useNavigate } from "react-router-dom";
import { workspaceRepository } from "../../modules/workspaces/workspace.repository";
function CreateWorkspace() {
  const { currentUser } = useCurrentUserStore();
  const navigate = useNavigate();

  if (currentUser == null) return <Navigate to="/signin" />;

  const createWorkspace = async (name: string) => {
    try {
      const newWorkspace = await workspaceRepository.create(name);
      navigate(`/${newWorkspace.id}/${newWorkspace.channels[0].id}`);
    } catch (error) {
      console.log("ワークスペースの作成に失敗しました", error);
    }
  };

  return (
    <div>
      <CreateWorkspaceModal onSubmit={createWorkspace} />
    </div>
  );
}

export default CreateWorkspace;
