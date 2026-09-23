import { classNames } from "../../utils/classNames.js";

export default function PageSection({
  children,
  className,
  containerClassName,
  id,
  variant,
}) {
  return (
    <section
      id={id}
      className={classNames(
        "portfolio-section",
        variant && `portfolio-section--${variant}`,
        className,
      )}
    >
      <div className={classNames("portfolio-shell", containerClassName)}>
        {children}
      </div>
    </section>
  );
}
