"use client";

import GalleryNav from "../../common/gallery/gallery-nav.component"
import Gallery from "../../common/gallery/gallery.component"

export default function Art() {
  return (
    <div className="page-container">
      <div className="dark-section">
        <h3>Art Portfolio</h3>

        <div className="normal-section">
          <p>
            I started to develop an interest in pursuing art more seriously in early 2021 where I began to spend more time practicing and learning about art. Since 2021 I’ve practiced both digital and traditional forms of art in my spare time. To develop my skills I've studied the styles and methods of different digital artists and done individual practice through exercises such as figure drawing, and still drawings. Below are a few of the works I am more proud of.
          </p>
        </div>
      </div>

      {/* <GalleryNav mediaType_id="63cb182e227300bc8c4c4724" /> */}
      <Gallery mediaType_id="63cb182e227300bc8c4c4724" />
    </div>
  );
}
