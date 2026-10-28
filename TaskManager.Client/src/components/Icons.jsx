//Set di icone custom di TaskFlow

function Icona({ className = "w-5 h-5", strokeWidth = 1.75, viewBox = "0 0 24 24", children }) {
  return (
    <svg
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}

export function IconLogo({ className }) {
  return (
    <Icona className={className} viewBox="0 0 32 32" strokeWidth={2.2}>
      <rect x="3" y="3" width="26" height="26" rx="8" />
      <path d="M10 16.5l4 4 8-9" />
    </Icona>
  );
}

export function IconPlus({ className }) {
  return (
    <Icona className={className}>
      <path d="M12 5v14M5 12h14" />
    </Icona>
  );
}

export function IconMoon({ className }) {
  return (
    <Icona className={className}>
      <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />
    </Icona>
  );
}

export function IconSun({ className }) {
  return (
    <Icona className={className}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
    </Icona>
  );
}

export function IconUser({ className }) {
  return (
    <Icona className={className}>
      <circle cx="12" cy="8.5" r="3.75" />
      <path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5" />
    </Icona>
  );
}

export function IconLogout({ className }) {
  return (
    <Icona className={className}>
      <path d="M10 4H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h3M15 8l4 4-4 4M19 12H10" />
    </Icona>
  );
}

export function IconCalendar({ className }) {
  return (
    <Icona className={className}>
      <rect x="3.5" y="5" width="17" height="15" rx="3.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4M8 14h.01M12 14h.01" />
    </Icona>
  );
}

//Stati: stesso cerchio, vuoto / mezzo pieno / con spunta
export function IconDaFare({ className }) {
  return (
    <Icona className={className}>
      <circle cx="12" cy="12" r="8" />
    </Icona>
  );
}

export function IconInCorso({ className }) {
  return (
    <Icona className={className}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 7.5a4.5 4.5 0 0 1 0 9z" fill="currentColor" stroke="none" />
    </Icona>
  );
}

export function IconCompletato({ className }) {
  return (
    <Icona className={className}>
      <circle cx="12" cy="12" r="8" />
      <path d="M8.5 12.2l2.4 2.4 4.6-4.8" />
    </Icona>
  );
}

export function IconBriefcase({ className }) {
  return (
    <Icona className={className}>
      <rect x="3.5" y="7.5" width="17" height="12" rx="3" />
      <path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5M3.5 12.5h17" />
    </Icona>
  );
}

export function IconHome({ className }) {
  return (
    <Icona className={className}>
      <path d="M4 10.5L12 4l8 6.5V18a2 2 0 0 1-2 2h-3.5v-5h-5v5H6a2 2 0 0 1-2-2z" />
    </Icona>
  );
}

export function IconCheck({ className, strokeWidth }) {
  return (
    <Icona className={className} strokeWidth={strokeWidth}>
      <path d="M5 12.5l4.5 4.5L19 7" />
    </Icona>
  );
}

export function IconPencil({ className }) {
  return (
    <Icona className={className}>
      <path d="M14.5 5.5l4 4L9 19l-5 1 1-5zM12.5 7.5l4 4" />
    </Icona>
  );
}

export function IconTrash({ className }) {
  return (
    <Icona className={className}>
      <path d="M4.5 7h15M9.5 7V5a1.5 1.5 0 0 1 1.5-1.5h2A1.5 1.5 0 0 1 14.5 5v2M6.5 7l.8 11.2A2 2 0 0 0 9.3 20h5.4a2 2 0 0 0 2-1.8L17.5 7M10 11v5M14 11v5" />
    </Icona>
  );
}

export function IconX({ className }) {
  return (
    <Icona className={className}>
      <path d="M6 6l12 12M18 6L6 18" />
    </Icona>
  );
}

export function IconAlert({ className }) {
  return (
    <Icona className={className}>
      <path d="M10.3 4.6a2 2 0 0 1 3.4 0l7 12A2 2 0 0 1 19 19.6H5a2 2 0 0 1-1.7-3l7-12zM12 9.5v4M12 16.5h.01" />
    </Icona>
  );
}

export function IconErrore({ className }) {
  return (
    <Icona className={className}>
      <circle cx="12" cy="12" r="8" />
      <path d="M9.5 9.5l5 5M14.5 9.5l-5 5" />
    </Icona>
  );
}

export function IconChevron({ className }) {
  return (
    <Icona className={className}>
      <path d="M7 10l5 5 5-5" />
    </Icona>
  );
}
