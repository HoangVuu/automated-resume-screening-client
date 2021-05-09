import React, { useEffect, useState } from "react";
import MatchSkillCard from "components/MatchSkill/MatchSkillCard/MatchSkillCard";
import "./CareerDirection.scss";

const CareerDirection = () => {
  return (
    <div className="career-direction">
      <div className="css-wryshy">
        <section className="css-jp3yaf css-w7terr css-16ul3l9">
          <div className="css-qsdgf9 css-7b1cf9">
            <h2 className="css-7959d3">Career directions</h2>
          </div>
          <div className="css-qsdgf9">
            <div className="css-1tpa9ur">
              11 roles where this skill is commonly valued by employers
            </div>
            <div className="css-1n7jy4c">
              <MatchSkillCard />
              <MatchSkillCard />
              <MatchSkillCard />
              <MatchSkillCard />
            </div>
            <hr class="css-qr6rkb css-1amdh8c"></hr>
            <div
              role="button"
              tabindex="0"
              aria-label="See all career directions"
              class="css-12cpa8r"
            >
              <div class="css-1aj6sdx css-1fljxvu">
                See all career directions
                <span
                  class="css-1i63fie"
                  style={{ transform: "rotateX(0deg)" }}
                >
                  <span class="css-10i16e9 css-1nvr5mv">
                    <svg
                      width="11"
                      height="18"
                      viewBox="0 0 12 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="#2765cf"
                        d="M1.414 0L12 10.01 1.414 20 0 18.527l9.13-8.517L.062 1.514 1.414 0"
                        fill-rule="evenodd"
                      ></path>
                    </svg>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CareerDirection;
