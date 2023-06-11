export default function dateExp(expire) {
  const now = Math.floor(Date.now() / 1000);
  const remainingTime = parseInt(expire) - now;

  const remainingMinutes = Math.floor(remainingTime / 60);
  const remainingHours = Math.floor(remainingMinutes / 60);
  const remainingMinutesAfterLastHour = remainingMinutes % 60;

  if (remainingHours > 0) {
    return `O token expira em ${remainingHours} horas e ${remainingMinutesAfterLastHour} minutos`;
  } else if (remainingMinutesAfterLastHour > 0) {
    return `O token expira em ${remainingMinutesAfterLastHour} minutos`;
  } else {
    return "O token expirou";
  }
}
