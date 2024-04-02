export const formatDatetimeForPostgres = (dateTimeString) => {
  const date = new Date(dateTimeString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month starts from 0, so add 1
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = "00";

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
