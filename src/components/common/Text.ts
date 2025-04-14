/**
 * Renders a text element with the specified tag and title.
 * @param {Object} param0 - The parameters for the text element.
 * @param {string} param0.title - The text content to be displayed.
 * @param {string} [param0.tag] - Optional HTML tag to wrap the text. Defaults to 'p' if not provided.
 * @returns {string} The HTML string representation of the text element.
 */

export const Text = ({
  tag,
  title,
}: {
  title: string;
  tag?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "p"
    | "span"
    | "label"
    | "div";
}): string => {
  if (tag) return `<${tag}>${title}</${tag}>`;

  return `<p>${title}</p>`;
};
