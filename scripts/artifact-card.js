class ArtifactCard extends HTMLElement {
    static get observedAttributes() {
        return ["name", "image", "twopiece", "fourpiece", "link"];
    }

    constructor() {
        super();

        // create shadow root
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        console.log("Component added to the DOM");
        // create element's internal structure
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                    min-width: 256px;
                    margin: 0 auto;
                }

                card {
                    display: grid;
                    grid-template-columns: auto 1fr;
                    border: var(--card-border, 1px solid black);
                    overflow: hidden;
                    position: relative;
                    transition: transform 0.2s ease-in-out;
                    width: 100%;
                    min-width: 256px;
                }

                card:hover {
                    transform: var(--card-hover-transform, translateY(-0.25rem));
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
                    cursor: pointer;
                }

                artifact-image {
                    grid-column: 1;
                    display: flex;
                    flex-direction: column;
                    margin: 0.5rem;
                }

                inner-card {
                    display: block;
                    border: var(--card-border, 1px solid black);
                    overflow: hidden;
                    position: relative;
                    text-align: center;
                    max-width: var(--card-max-width, 8rem);
                    max-height: var(--card-max-height, 10rem);
                    transition: transform 0.2s ease-in-out;
                    align-items: center;
                    justify-content: center;
                    background-color: var(--card-5star-bg, #e1aa51);
                }

                inner-card img {
                    width: 100%;
                    height: auto;
                    display: block;
                }

                inner-card h2 {
                    margin: 0;
                    padding: var(--card-text-padding, 0.125rem);
                    color: var(--card-text-color, black);
                    background-color: var(--card-text-bg, lightgrey);
                    height: var(--card-text-height, 2rem);
                    font-weight: bold;
                    font-size: var(--card-text-size, 0.8rem);
                    text-align: center;
                    overflow-wrap: break-word;
                }

                artifact-description {
                    padding: 0.5rem;
                    display: block;
                }

                artifact-description-grid {
                    display: flex;
                    gap: 0.5rem;
                }

                .label {
                    font-weight: bold;
                }
                
                .bonus {
                    font-weight: normal;
                    margin-left: 0.5rem;
                }

                @media (max-width: 768px) {                    
                    card {
                        grid-template-columns: 1fr;
                        grid-template-rows: auto auto;
                    }
                    
                    artifact-image {
                        grid-column: 1;
                        grid-row: 1;
                    }
                    
                    artifact-description {
                        grid-column: 1;
                        grid-row: 2;
                    }
                }

                @media (max-width: 480px) {
                    :host {
                        width: 100%;
                    }
                }
            </style>
            <card class="star5">
                <artifact-image>
                    <inner-card>
                        <picture>
                            <img id="artifact-img" alt="artifact image">
                        </picture>
                        <h2 id="artifact-set-name">set name</h2>
                    </inner-card>
                </artifact-image>
                <artifact-description>
                    <description-grid>
                        <p class="label" id="twopiece">2-Piece:</p>
                        <p class="bonus" id="twopiece-bonus">Two piece set bonus description</p>
                        
                        <p class="label" id="fourpiece">4-Piece:</p>
                        <p class="bonus" id="fourpiece-bonus">Four piece set bonus description</p>
                    </description-grid>
                </artifact-description>
            </card>
        `;
        this.titleElement = this.shadowRoot.querySelector("name");
        this.render();
    }

    disconnectedCallback() {
        console.log("Component removed from the DOM");
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(
            `Attribute '${name}' changed from '${oldValue}' to '${newValue}'`
        );
        this.render();
    }

    render() {
        const name = this.getAttribute("name") || "Unknown Artifact";
        const image = this.getAttribute("image") || "";
        const twopiece =
            this.getAttribute("twopiece") || "No 2-piece bonus available";
        const fourpiece =
            this.getAttribute("fourpiece") || "No 4-piece bonus available";
        const link = this.getAttribute("link") || "#";

        const nameElement = this.shadowRoot.querySelector("#artifact-set-name");
        const imageElement = this.shadowRoot.querySelector("#artifact-img");
        const twoPieceElement =
            this.shadowRoot.querySelector("#twopiece-bonus");
        const fourPieceElement =
            this.shadowRoot.querySelector("#fourpiece-bonus");
        const linkElement = this.shadowRoot.querySelector("#artifact-set-link");

        if (nameElement) nameElement.textContent = name;
        if (imageElement) {
            imageElement.src = image;
            imageElement.alt = name;
        }
        if (twoPieceElement) twoPieceElement.textContent = twopiece;
        if (fourPieceElement) fourPieceElement.textContent = fourpiece;
        if (linkElement) {
            linkElement.href = link;
        }
    }
}

customElements.define("artifact-card", ArtifactCard);
