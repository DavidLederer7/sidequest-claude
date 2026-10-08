// Only Sidequest-owned, non-credential configuration crosses this boundary.
// Never enumerate, copy, serialize or forward the installer's environment.
export function readSidequestEnvironment() {
  return {
    SIDEQUEST_STATE_DIR: process.env.SIDEQUEST_STATE_DIR,
    SIDEQUEST_WAIT_SECONDS: process.env.SIDEQUEST_WAIT_SECONDS,
    SIDEQUEST_WAIT_MODE: process.env.SIDEQUEST_WAIT_MODE,
  };
}
