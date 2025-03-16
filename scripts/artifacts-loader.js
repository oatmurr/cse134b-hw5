document.addEventListener("DOMContentLoaded", () => {
    const artifactsContainer = document.getElementById("artifacts-container");

    // load artifacts from localStorage
    loadLocalArtifacts();

    // fetch artifacts from server
    fetchRemoteArtifacts();

    function loadLocalArtifacts() {}

    function fetchRemoteArtifacts() {}

    function createArtifactCard(artifact, container) {}

    window.saveArtifact = function (artifact) {};
});
