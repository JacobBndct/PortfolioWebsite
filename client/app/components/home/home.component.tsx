"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import AboutMe from "./about-me.component";
import Carousel from "../common/carousel/carousel.component";
import FeaturedItem from "../common/carousel/featured-item.component";
import Banner from "./banner.component";

// -------------------- Types --------------------

interface MediaType {
  name: string;
}

interface Media {
  _id: string;
  name: string;
  description: string;
  previewImageURL: string;
  dateOfCreation: string;
  typeOfMedia_ids: MediaType;
}

// -------------------- Helpers --------------------

function truncateString(str: string, cutOff: number): string {
  if (str.length <= cutOff) return str;

  const index = str.lastIndexOf(" ", cutOff);
  return str.slice(0, index) + " . . .";
}

// -------------------- Component --------------------

export default function Home() {
  const [featuredMedia, setFeaturedMedia] = useState<Media[]>([]);
  const [skills, setSkills] = useState<any[]>([]); // You can type this later if needed

  // Fetch featured media
  useEffect(() => {
    axios
      .get<Media[]>("https://jacobbndct.ca/media/featured")
      .then((response) => {
        setFeaturedMedia(response.data);
      })
      .catch((err) => {
        console.error("Error:", err);
      });

    // If you want skills later, uncomment and type properly:
    /*
    axios
      .get("https://jacobbndct.ca/skills/")
      .then((response) => setSkills(response.data))
      .catch((err) => console.error("Error:", err));
    */
  }, []);

  // Generate carousel items
  const carouselItems = () => {
    if (!featuredMedia || featuredMedia.length === 0) {
      console.log("empty");
      return null;
    }

    return featuredMedia.map((media) => {
      const date = new Date(media.dateOfCreation);
      const type =
        media.typeOfMedia_ids.name.charAt(0).toUpperCase() +
        media.typeOfMedia_ids.name.slice(1);

      return (
        <FeaturedItem
          key={media._id}
          link={"/" + type}
          img={media.previewImageURL}
          mediaType={type}
          name={media.name}
          date={date.toDateString().split(" ").slice(1).join(" ")}
          description={truncateString(media.description, 90)}
        />
      );
    });
  };

  // Generate skill list (unused for now)
  const listItems = () => {
    return skills.map((skill) => (
      <li key={skill._id}>{skill.name}</li>
    ));
  };

  return (
    <div className="page-container">
      <Banner />

      <div className="standard-section">
        <AboutMe />
      </div>

      <div className="dark-section">
        <div className="wide-section">
          <h3>Featured Work</h3>
          <p>Here are a few of my featured projects styled as trading cards</p>

          <Carousel show={3} length={featuredMedia.length} autoScroll={true}>
            {carouselItems()}
          </Carousel>
        </div>
      </div>

      <div className="wide-section">
        {/* Future Skills Section */}
        {/* 
        <h3>Skills</h3>
        <p>See my skills in practice with my projects</p>
        <ul>{listItems()}</ul>
        */}
      </div>
    </div>
  );
}