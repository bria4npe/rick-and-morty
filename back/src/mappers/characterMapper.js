export function toSummary(c) {
  return { id: c.id, name: c.name, status: c.status, image: c.image };
}

export function toDetail(c) {
  return {
    id: c.id,
    name: c.name,
    status: c.status,
    species: c.species,
    gender: c.gender,
    image: c.image,
    origin: c.origin?.name ?? "Unknown",
    location: c.location?.name ?? "Unknown",
    episodeCount: c.episode?.length ?? 0,
  };
}
