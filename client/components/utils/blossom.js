import { BlossomScene, Petal } from "../Blossom";

const petalsTypes = [
  new Petal({ customClass: "petal-style1" }),
  new Petal({ customClass: "petal-style2" }),
  new Petal({ customClass: "petal-style3" }),
  new Petal({ customClass: "petal-style4" }),
];
const b = new BlossomScene({
  id: "blossom-container",
  petalsTypes,
  numPetals: 50,
});
