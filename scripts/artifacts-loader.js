document.addEventListener("DOMContentLoaded", () => {
    const artifactsContainer = document.getElementById("artifacts-container");
    const loadLocalButton = document.getElementById("load-local");
    const loadRemoteButton = document.getElementById("load-remote");
    const resetLocalButton = document.getElementById("reset-local");

    // data from local-artifacts.json
    initialiseLocalStorage();

    // sample data for testing
    const sampleArtifacts = [
        {
            name: "Crimson Witch of Flames",
            image: "/images/artifacts/UI_RelicIcon_15006_4.png",
            twopiece: "+15% Pyro DMG Bonus",
            fourpiece:
                "Increases Overloaded and Burning DMG by 40%. Increases Vaporize and Melt DMG by 15%. Using an Elemental Skill increases the 2-Piece Set Bonus by 50% for 10s. Max 3 stacks.",
            link: "./placeholder.html",
            rarity: "5",
        },
        {
            name: "Viridescent Venerer",
            image: "/images/artifacts/UI_RelicIcon_15002_4.png",
            twopiece: "+15% Anemo DMG Bonus",
            fourpiece:
                "Increases Swirl DMG by 60%. Decreases opponent's Elemental RES to the element infused in the Swirl by 40% for 10s.",
            link: "./placeholder.html",
            rarity: "4",
        },
        {
            name: "Noblesse Oblige",
            image: "/images/artifacts/UI_RelicIcon_15007_4.png",
            twopiece: "+20% Elemental Burst DMG",
            fourpiece:
                "Using an Elemental Burst increases all party members' ATK by 20% for 12s. This effect cannot stack.",
            link: "./placeholder.html",
            rarity: "3",
        },
    ];

    // initialise localStorage with sample data if it doesn't exist
    // if (!localStorage.getItem("artifacts")) {
    //     localStorage.setItem("artifacts", JSON.stringify(sampleArtifacts));
    // }

    // event listeners for buttons
    loadLocalButton.addEventListener("click", () => {
        clearArtifacts();
        loadLocalArtifacts();
    });

    loadRemoteButton.addEventListener("click", () => {
        clearArtifacts();
        fetchRemoteArtifacts();
    });

    resetLocalButton.addEventListener("click", () => {
        resetLocalStorage();
        clearArtifacts();
        // loadLocalArtifacts();
    });

    // clear artifacts container
    function clearArtifacts() {
        artifactsContainer.innerHTML = "";
    }

    // manually clear local artifacts (to fix localStorage not updating)
    function resetLocalStorage() {
        localStorage.removeItem("artifacts");
        console.log("Local storage cleared");
        initialiseLocalStorage();
    }

    // initialise localStorage with data from local-artifacts.json if it doesn't exist already
    function initialiseLocalStorage() {
        if (!localStorage.getItem("artifacts")) {
            fetch("../data/local-artifacts.json")
                .then((response) => response.json())
                .then((artifacts) => {
                    localStorage.setItem(
                        "artifacts",
                        JSON.stringify(artifacts)
                    );
                    console.log(
                        "Local artifacts loaded from local-artifacts.json"
                    );
                })
                .catch((error) => {
                    console.error("Error loading local artifacts:", error);
                    localStorage.setItem(
                        "artifacts",
                        JSON.stringify(sampleArtifacts)
                    );
                });
        }
    }

    // load artifacts from localStorage
    function loadLocalArtifacts() {
        try {
            const artifacts =
                JSON.parse(localStorage.getItem("artifacts")) || [];

            if (artifacts.length === 0) {
                artifactsContainer.innerHTML =
                    "<p>No artifacts found in localStorage.</p>";
                return;
            }

            artifacts.forEach((artifact) => {
                createArtifactCard(artifact, artifactsContainer);
            });
        } catch (error) {
            console.error("Error loading artifacts from localStorage:", error);
            artifactsContainer.innerHTML =
                "<p>Error loading artifacts from localStorage.</p>";
        }
    }

    // fetch artifacts from server
    function fetchRemoteArtifacts() {
        const apiURL =
            "https://my-json-server.typicode.com/oatmurr/cse134b-hw5/artifacts";

        fetch(apiURL)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })

            .then((data) => {
                if (data.length === 0) {
                    artifactsContainer.innerHTML =
                        "<p>No artifacts found on the server.</p>";
                    return;
                }

                data.forEach((artifact) => {
                    createArtifactCard(artifact, artifactsContainer);
                });
            })

            .catch((error) => {
                console.error("Error fetching artifacts from remote:", error);
                artifactsContainer.innerHTML =
                    "<p>Error fetching artifacts from remote.</p>";
            });
    }

    // create artifact card
    function createArtifactCard(artifact, container) {
        const card = document.createElement("artifact-card");

        card.setAttribute("name", artifact.name);
        card.setAttribute("image", artifact.image);
        card.setAttribute("twopiece", artifact.twopiece);
        card.setAttribute("fourpiece", artifact.fourpiece);
        card.setAttribute("link", artifact.link);
        card.setAttribute("rarity", artifact.rarity);

        container.appendChild(card);
    }
});
