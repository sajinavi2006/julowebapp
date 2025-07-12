export default obj => {
  //check undefined label
  const qoutei1 = obj.action.indexOf('"');
  if (qoutei1 > -1) {
    const qoutei2 = obj.action.indexOf('"', qoutei1 + 1);
    if (qoutei2 > -1) {
      if (qoutei2 - qoutei1 > 0) {
        const contain = obj.action.substring(qoutei1 + 1, qoutei2);
        if (contain == "undefined" || contain == "false") {
          return;
        }
      } else {
        return;
      }
    }
  }
  //check redundant data in navlog
  const navlog = localStorage.navlog ? JSON.parse(localStorage.navlog) : [];
  if (navlog.length > 0) {
    for (let i = navlog.length - 1; i >= 0; i--) {
      const lastData = navlog[i];
      if (
        lastData["page_id"] === obj["page_id"] &&
        lastData["action"] === obj["action"]
      ) {
        lastData["nav_log_ts"] = new Date(lastData["nav_log_ts"]);
        const diffNavLogTS = obj["nav_log_ts"] - lastData["nav_log_ts"];
        if (Math.abs(diffNavLogTS) < 1000) {
          return;
        }
      }
    }
  }

  navlog.push(obj);
  localStorage.navlog = JSON.stringify(navlog);
};
