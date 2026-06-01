fetch("https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF5hJpIqvoj3UomLxs13O3aXLUCri8tp1I-JhbfOifr-BrWdeVJasC1Jk13fof3xQTu2txR8MdstBj8rIJbgoo2grfhdpiJvQ8kU-MhH89xZ5MakYBFoHsmihnZRNWipXPhrMiBjDU=").then(res => {
  console.log("Final URL:", res.url);
}).catch(err => {
  console.error(err);
});
