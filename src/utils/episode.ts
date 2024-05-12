const episodeRegex = /\/(\d+)$/;

export const extractEpisodeNumber = (url: string) => {
  const match = url.match(episodeRegex);
  if (match && match[1]) {
    return match[1];
  } else {
    return null;
  }
};
