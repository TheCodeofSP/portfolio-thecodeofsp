function StepLabel({ index, label, padded = true }) {
  const step = padded ? String(index + 1).padStart(2, "0") : index + 1;

  return (
    <span>
      <b>{step}</b>
      {label}
    </span>
  );
}

export default function ThemeSignature({ labels, theme }) {
  if (theme === "affirme") {
    return (
      <div
        className="theme-signature theme-signature--affirme"
        aria-label="Une progression dynamique de la conception à la mise en ligne"
      >
        <div className="theme-signature__beam" aria-hidden="true" />
        {labels.map((label, index) => (
          <StepLabel key={label} index={index} label={label} />
        ))}
      </div>
    );
  }

  if (theme === "minimaliste") {
    return (
      <div
        className="theme-signature theme-signature--minimaliste"
        aria-label="Une méthode structurée en six étapes"
      >
        <p>PROCESSUS / 06</p>
        <div>
          {labels.map((label, index) => (
            <StepLabel key={label} index={index} label={label} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="theme-signature theme-signature--accueillant"
      aria-label="Un parcours continu de la compréhension à la mise en ligne"
    >
      <svg aria-hidden="true" viewBox="0 0 1000 150" preserveAspectRatio="none">
        <path d="M20,90 C160,12 260,142 405,70 C555,-4 650,134 790,62 C875,18 930,40 980,72" />
      </svg>
      {labels.map((label, index) => (
        <StepLabel
          key={label}
          index={index}
          label={label}
          padded={false}
        />
      ))}
    </div>
  );
}
