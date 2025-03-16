class ArtifactCard extends HTMLElement {
    static get observedAttributes() {
        return ["name", "image", "description", "link"];
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
                    padding: 1rem;
                }

                .artifact-card {
                    display: grid;
                    grid-template-columns: 8rem 1fr;
                    border: var(--card-border, 1px solid black);
                    overflow: hidden;
                    position: relative;
                    transition: transform 0.2s ease-in-out;
                }

                .artifact-card.star5 {
                    background-color: var(--card-5star-bg, #e1aa51);
                }

                .artifact-card.star4 {
                    background-color: var(--card-4star-bg, #b684c8);
                }

                .artifact-card.star3 {
                    background-color: var(--card-3star-bg, #51A1B5);
                }

                .artifact-card:hover {
                    transform: var(--card-hover-transform, translateY(-0.25rem));
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
                    cursor: pointer;
                }

                artifact-image {
                    grid-column: 1;
                    display: flex;
                    flex-direction: column;
                }

                picture {
                    width: 100%;
                    height: auto;
                    display: block;
                }

                h2[id="name"] {
                    margin: 0;
                    padding: 0.125rem;
                    color: var(--card-text-color, black);
                    background-color: var(--card-text-bg, lightgrey);
                    font-weight: bold;
                    font-size: var(--card-text-size, 0.8rem);
                    text-align: center;
                    overflow-wrap: break-word;
                }

                artifact-description {
                    grid-column: 2;
                    padding: 0.5rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }
            </style>
            <artifact-card class="star5">
                <artifact-image>
                    <picture>
                        <img src="/images/artifacts/placeholder.png" alt="artifact image">
                    </picture>
                    <h2 id="name">set name</h2>
                </artifact-image>
                <artifact-description>
                    <p>description</p>
                    <a href=".artifacts/placeholder.html">
                </artifact-description>
            </artifact-card>
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
        const image =
            this.getAttribute("image") || "/images/artifacts/placeholder.png";
        const description =
            this.getAttribute("description") || "No description available";
        const link = this.getAttribute("link") || "#";

        const nameElement = this.shadowRoot.querySelector("#name");
        const imageElement = this.shadowRoot.querySelector("img");
        const descriptionElement = this.shadowRoot.querySelector("p");
        const linkElement = this.shadowRoot.querySelector("a");

        if (nameElement) {
            nameElement.textContent = name;
        }
        if (imageElement) {
            imageElement.src = image;
            imageElement.alt = name;
        }
        if (descriptionElement) descriptionElement.textContent = description;
        if (linkElement) linkElement.href = link;
    }
}

customElements.define("artifact-card", ArtifactCard);
