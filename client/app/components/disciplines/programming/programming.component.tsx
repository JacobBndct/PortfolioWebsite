"use client";

import Gallery from "../../common/gallery/gallery.component";

export default function Programming() {
  return (
    <div className="page-container">
      <div className="dark-section">
        <h3>Programming Projects</h3>

        <div className="normal-section">
          <p>
            As a software engineer I love to take on new challenges and push
            myself. To do this I am constantly learning about new technologies
            and pushing my understanding of concepts further. Some of the
            general programming projects I am most proud of are included below.
          </p>

          <p>
            Programming languages: C#, JavaScript, Python, GLSL, C/C++, Java,
            HTML, PHP, pyMel
          </p>
        </div>
      </div>

      <Gallery mediaType_id="653fd53043100b1745db48c3" />
    </div>
  );
}