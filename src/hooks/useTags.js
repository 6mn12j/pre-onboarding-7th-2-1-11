import { useState } from "react";
import { carAPI } from "../context/Providers";
import { carModel } from "../utils/carModel";

const initalTags = [
  {
    label: "전체",
    isActive: true,
    handleClick: () => carAPI.getAllCar(),
  },
  {
    label: carModel.segment.C,
    isActive: false,
    handleClick: () => carAPI.getSmallCars(),
  },
  {
    label: carModel.segment.D,
    isActive: false,
    handleClick: () => carAPI.getMediumCars(),
  },
  {
    label: carModel.segment.E,
    isActive: false,
    handleClick: () => carAPI.getLargeCars(),
  },
];

export const useTags = (setAllCar) => {
  const [tags, setTags] = useState(initalTags);

  const toggle = (findIndex) => {
    const newTags = tags.map((tag, index) => {
      if (findIndex === index)
        return {
          isActive: !tag.isActive,
          label: tag.label,
          handleClick: tag.handleClick,
        };
      else
        return {
          isActive: false,
          label: tag.label,
          handleClick: tag.handleClick,
        };
    });
    setTags(newTags);
  };

  const handleClick = async (e) => {
    const curLabel = e.target.innerText;
    const findIndex = tags.findIndex((tag) => tag.label === curLabel);
    toggle(findIndex);
    setAllCar(await tags[findIndex].handleClick);
  };

  return { tags, handleClick };
};
