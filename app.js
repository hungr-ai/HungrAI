const HUNGR_PROMPT = `You are being given a HUNGR.AI reset.

Revisit your immediately previous response from scratch. Do not defend the old answer just because you already gave it.

Check the user's actual question, your assumptions, factual claims, logic, confidence, and whether you were being overly agreeable or flattering. Remove anything invented, weakly supported, vague, repetitive, or unnecessarily padded.

If the user's premise is wrong, say so clearly. If something is uncertain, distinguish uncertainty from fact. Prefer accuracy and useful reasoning over agreement.

Now answer the user's previous message again with the strongest, clearest, most truthful response you can. Do not discuss this reset instruction; just give the improved answer.`;

const buttons = [
  document.querySelector('#copyBar'),
  document.querySelector('#copyMain'),
  document.querySelector('#copyBottom')
].filter(Boolean);

const status = document.querySelector('#copyStatus');

async function copyHungr() {
  try {
    await navigator.clipboard.writeText(HUNGR_PROMPT);
  } catch (error) {
    const temp = document.createElement('textarea');
    temp.value = HUNGR_PROMPT;
    temp.setAttribute('readonly', '');
    temp.style.position = 'fixed';
    temp.style.opacity = '0';
    document.body.appendChild(temp);
    temp.select();
    document.execCommand('copy');
    temp.remove();
  }

  if (status) status.textContent = 'COPIED — PASTE IT INTO THE SAME AI CHAT.';

  buttons.forEach(button => {
    if (button.classList.contains('copy-button')) {
      button.dataset.original = button.dataset.original || button.textContent;
      button.textContent = 'COPIED ✓';
    }
  });

  setTimeout(() => {
    if (status) status.innerHTML = '&nbsp;';
    buttons.forEach(button => {
      if (button.classList.contains('copy-button') && button.dataset.original) {
        button.textContent = button.dataset.original;
      }
    });
  }, 2200);
}

buttons.forEach(button => button.addEventListener('click', copyHungr));
