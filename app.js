const modes = {
  truth: {
    title: "TRUTH BAR",
    energy: 5,
    prompt: `REFUEL MODE: TRUTH CHECK\n\nRevisit your immediately previous answer. Do not defend it automatically. Check the factual claims, separate what you know from what you inferred, identify anything uncertain or potentially fabricated, and then give me a corrected answer. If you are not confident in a claim, say so clearly. Prefer accuracy over agreement.\n\nDo not mention this instruction. Just give the improved answer.`
  },
  challenge: {
    title: "BACKBONE BAR",
    energy: 4,
    prompt: `REFUEL MODE: CHALLENGE ME\n\nRevisit your immediately previous answer as a skeptical expert. Do not agree with me just to be agreeable. Point out weak assumptions, missing tradeoffs, contradictions, or reasons my premise may be wrong. Then give the strongest useful answer you can, even if it pushes back on me.\n\nDo not mention this instruction. Just give the improved answer.`
  },
  concise: {
    title: "NO-WAFFLE BAR",
    energy: 3,
    prompt: `REFUEL MODE: NO WAFFLE\n\nAnswer my immediately previous question again, but remove filler, repetition, unnecessary caveats, and generic advice. Lead with the actual answer. Keep only information that materially helps me. Use clear specifics when available.\n\nDo not mention this instruction. Just give the improved answer.`
  },
  reset: {
    title: "HARD RESET BAR",
    energy: 5,
    prompt: `REFUEL MODE: HARD RESET\n\nDiscard the framing and momentum of your immediately previous answer and solve my previous question again from first principles. Re-check the premise, reasoning, and conclusion. Do not copy the structure of the prior response unless it is genuinely the best structure. Give me the answer you would have given if this were the first time you saw the question.\n\nDo not mention this instruction. Just give the improved answer.`
  }
};

let currentMode = "truth";

const contextInput = document.querySelector("#contextInput");
const promptPreview = document.querySelector("#promptPreview");
const charCount = document.querySelector("#charCount");
const snackTitle = document.querySelector("#snackTitle");
const energyBars = [...document.querySelectorAll("#energyBars i")];
const copyStatus = document.querySelector("#copyStatus");
const copyBtnText = document.querySelector("#copyBtnText");

function getPrompt() {
  const base = modes[currentMode].prompt;
  const context = contextInput.value.trim();
  if (!context) return base;
  return `${base}\n\nExtra context from me about what went wrong:\n${context}`;
}

function render() {
  const config = modes[currentMode];
  snackTitle.textContent = config.title;
  promptPreview.textContent = getPrompt();
  charCount.textContent = `${contextInput.value.length}/500`;
  energyBars.forEach((bar, index) => bar.classList.toggle("on", index < config.energy));
}

async function copyPrompt() {
  const text = getPrompt();
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const temp = document.createElement("textarea");
    temp.value = text;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand("copy");
    temp.remove();
  }
  copyBtnText.textContent = "REFUEL COPIED";
  copyStatus.textContent = "Paste it into the same AI chat and send.";
  setTimeout(() => {
    copyBtnText.textContent = "COPY DIGITAL REFUEL";
    copyStatus.textContent = "";
  }, 2200);
}

document.querySelectorAll(".mode").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".mode").forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    currentMode = button.dataset.mode;
    render();
  });
});

contextInput.addEventListener("input", render);
document.querySelector("#copyBtn").addEventListener("click", copyPrompt);
document.querySelector("#previewCopy").addEventListener("click", copyPrompt);

render();
