import { BlossomScene, Petal } from "../misc/Blossom";

const petalsTypes = [
  new Petal({ customClass: "petal-style1" }),
  new Petal({ customClass: "petal-style2" }),
  new Petal({ customClass: "petal-style3" }),
  new Petal({ customClass: "petal-style4" }),
];

const viewWidth = window.innerWidth;

const b = new BlossomScene({
  id: "blossom-container",
  petalsTypes,
  numPetals: viewWidth > 768 ? 30 : 30,
});
