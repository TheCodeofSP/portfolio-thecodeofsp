import { SITE } from "../config/site.config.js";

export async function submitForm(form, errorMessage) {
  const response = await fetch(SITE.formEndpoint, {
    method: "POST",
    body: new FormData(form),
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(errorMessage);
  }
}
