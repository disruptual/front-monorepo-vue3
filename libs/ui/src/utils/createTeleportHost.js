export const createTeleportHost = id => {
  const drawerRootElement = document.getElementById(id);
  if (!drawerRootElement) {
    const div = document.createElement('div');
    div.id = id;
    document.body.appendChild(div);
  }
};
