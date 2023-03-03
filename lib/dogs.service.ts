export type DogBreeds = {
  [breed: string]: string[];
};

// export const fetchDogBreeds = async () => {
//   const res = await fetch('https://dog.ceo/api/breeds/list/all');
//   const json = await res.json();
//   return json.message as DogBreeds;
// };

export const fetchDogBreeds = async () => {
  const res = await fetch('https://dog.ceo/api/breeds/list/all');
  const json = await res.json();
  const dogBreeds = Object.entries(json.message as DogBreeds).reduce(
    (breeds, [breed, subBreeds]) => {
      if (subBreeds.length) {
        subBreeds.forEach(subBreed => breeds.push(`${subBreed} ${breed}`));
      } else {
        breeds.push(breed);
      }
      return breeds;
    },
    [] as string[]
  );
  return dogBreeds as string[];
};

export const fetchDogBreedImage = async (breed: string, subbreed?: string) => {
  let query = breed;
  if (subbreed) query += `/${subbreed}`;
  const res = await fetch(`https://dog.ceo/api/breed/${query}/images/random`);
  const json = await res.json();
  return json.message as string;
};

// export const fetchDogBreeds = async () => {
//   return fetch('https://dog.ceo/api/breeds/list/all')
//     .then(resp => resp.json())
//     .then(data => data.message as DogBreeds);
// };

// export const fetchDogBreedImage = async (breed: string, subbreed?: string) => {
//   let query = breed;
//   if (subbreed) query += `/${subbreed}`;
//   return fetch(`https://dog.ceo/api/breed/${query}/images/random`)
//     .then(resp => resp.json())
//     .then(data => data.message as string);
// };
