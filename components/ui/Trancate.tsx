const truncateText = (description: string, charLimit: number = 20): string => {
  if (description.length > charLimit) {
    return `${description.slice(0, charLimit)} ...`;
  }

  return description;
};

export default truncateText;

  