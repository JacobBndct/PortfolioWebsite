"use client";

import { useState, FormEvent, useEffect } from "react";
import axios from "axios";

import styles from "./mobius.module.css";
import Ocarina from "./Ocarina.component";
import Carousel from "../common/carousel/carousel.component";
import FeaturedItem from "../common/carousel/featured-item.component";

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

function truncateString(str: string, cutOff: number): string {
  if (str.length <= cutOff) return str;

  const index = str.lastIndexOf(" ", cutOff);
  return str.slice(0, index) + " . . .";
}

export default function Mobius() {
  const [code, setCode] = useState("");
  const [featuredMedia, setFeaturedMedia] = useState<Media[]>([]);

  // Fetch featured media
  useEffect(() => {
    axios
      .get<Media[]>("https://jacobbndct.ca/media/featured")
      .then((response) => {
        const filtered = response.data.filter(
          (media) => media.typeOfMedia_ids.name !== "art" && media.typeOfMedia_ids.name !== "shader"
        );
        setFeaturedMedia(filtered);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    const enteredCode = String(formJson.code ?? "");
    setCode(enteredCode);
  };

  const correctCode = "--|-..|-.";

  const isCorrect = code !== "" && code === correctCode;
  const isIncorrect = code !== "" && code !== correctCode;

  return (
    <div className="page-container">
      <div className="dark-section">
        <h3>Mobius Digital</h3>

        <div className="normal-section">
          <p>
            Hello and welcome to my portfolio! This is a page that I created to help showcase some of my relevant skills in gameplay AI and audio that I thought would be interesting.While this page holds some extra bonuses for the curious, feel free to explore the rest of my website through the links in the header.
          </p>
        </div>
      </div>

      <div className="wide-section">
        <div className={`${styles["ocarinaBox"]} m-4`}>
          <Ocarina />
        </div>
      </div>


      <div className="dark-section">
        <div className="wide-section">
          <h3>Featured Work</h3>
          <p>Here are a few projects that relate to the software engineering role</p>

          <Carousel show={3} length={featuredMedia.length} autoScroll={true}>
            {carouselItems()}
          </Carousel>
        </div>
      </div>

      <div className="wide-section">
        <div className={`${styles["ocarinaBox"]} m-4`}>
          <div className="standard-section">
            <h4>
              Hidden Message
            </h4>

            <form onSubmit={handleSubmit}>
              <label>
                Code: <input name="code" />
              </label>

              <button type="submit">Enter</button>

              {isIncorrect && (
                <p className={styles["incorrect"]}>Your code is incorrect.</p>
              )}

              {isCorrect && (
                <p className={styles["correct"]}>Your code is correct.</p>
              )}
            </form>

            <div className="standard-section">
              <details className="text-center">
                <summary>HINT</summary>
                <p className="text-[15px]">
                  Don't forget the importance of what you can learn
                  between starting your <b>education</b> and reaching your <b>graduation date</b>!
                </p>   
              </details>
            </div>
          </div>

          {isCorrect && (
            <div>
              <div className="standard-section">
                <div className={styles["message-animate"]}>
                  <h3>Congratulations Explorer!</h3>

                  <p>
                    If you're reading this that means you've found the code to access this section
                  </p>

                  <p>
                    Now that I've got your attention, I thought I would take this
                    opportunity to write out something a little more sincere than I
                    would normally get to put in an application. Outer Wilds has
                    truly had a profound impact on my life. The game has pushed me
                    to continue to be curious, follow my passions, and helped me
                    connect with so many people. I hope that one day I'll be able to
                    contribute to a project that can impact people the same way
                    Outer Wilds has. If you've read this far, I've included a bit of
                    fan-art I made back in 2023 below.
                  </p>

                  <p>Thanks for bringing a bit more curiosity to the world :)</p>
                </div>
              </div>

              <div className={styles["message-animate"]}>
                <img className={styles["fan-art"]}
                  src="https://jb-portfolio-website.s3.ca-central-1.amazonaws.com/OuterWilds.png"
                  alt="Outer Wilds fan art"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}