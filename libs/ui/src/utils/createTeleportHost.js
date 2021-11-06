export const createTeleportHost = id => {
  const host = document.getElementById(id);
  if (!host) {
    const div = document.createElement('div');
    div.id = id;
    document.body.appendChild(div);
  }
};
