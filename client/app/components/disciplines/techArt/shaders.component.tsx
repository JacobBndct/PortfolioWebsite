"use client";

import Gallery from "../../common/gallery/gallery.component";

export default function Shaders() {
  return (
    <div className="page-container">
      <div className="dark-section">
        <h3>Shaders</h3>

        <div className="normal-section">
          <p>
            Shaders fascinate me because they combine art with math and
            programming. I've explored the use of both fragment and vertex
            shaders, though most of my projects tend to use fragment shaders.
            Below are a few shaders that I've written.
          </p>

          <p>Tools: Shadertoy, Unity</p>
        </div>
      </div>

      <Gallery mediaType_id="653fd51043100b1745db48c2" />
    </div>
  );
}