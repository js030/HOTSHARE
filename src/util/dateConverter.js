const dateConverter = (createdAt) => {
  const start = new Date(createdAt);
  const end = new Date();

  const second = Math.floor((end - start) / 1000);
  const minutes = Math.floor(second / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (second < 60) {
    return `${second}초 전`;
  } else if (minutes < 60) {
    return `${minutes}분 전`;
  } else if (hours < 24) {
    return `${hours}시간 전`;
  } else if (days < 7) {
    return `${days}일 전`;
  } else {
    return start.toLocaleDateString;
  }
};

export default dateConverter;
