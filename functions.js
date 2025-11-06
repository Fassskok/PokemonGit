export const clickCounter = (limit = 6) => {
  let count = 0;
  return (btn) => {
    if (count < limit) {
      count++;
      const remaining = limit - count;
      btn.textContent = `Клік ${count} (залишилось ${remaining})`;
    } else {
      btn.textContent = `Ліміт ${limit} вичерпано`;
      btn.disabled = true;
    }
  };
};

export function showResult(message) {
  const screen = document.getElementById("Result_Window");
  const text = document.getElementById("Result_Text");
  text.textContent = message;
  screen.style.display = "flex";
}
