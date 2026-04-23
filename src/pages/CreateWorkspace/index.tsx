import "../Signup/auth.css";
import CreateWorkspaceModal from "../Home/WorkspaceSelector/CreateWorkspaceModal";
import { useCurrentUserStore } from "../../modules/auth/current-user.state";
import { Navigate } from "react-router-dom";
import { workspaceRepository } from "../../modules/workspaces/workspace.repository";
function CreateWorkspace() {
  const { currentUser } = useCurrentUserStore();

  if (currentUser == null) return <Navigate to="/signin" />;

  const createWorkspace = async (name: string) => {
    try {
      const newWorkspace = await workspaceRepository.create(name);
      console.log(newWorkspace);
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
