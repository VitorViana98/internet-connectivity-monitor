const DEBUG_LENGTH = 88;

const get_debug_text = (message) => {
  let out_message = `# ${message}`;
  if (out_message.length <= DEBUG_LENGTH) {
    const length_diff = 88 - out_message.length;
    const separators = "=".repeat(length_diff);
    out_message = `${out_message} ${separators}#`;
  }
  return out_message;
};

const emit = (message, log_type = "INFO") => {
  let out_message = message;

  if (log_type === "DEBUG") {
    out_message = get_debug_text(out_message);
  }

  const text = get_color_text(
    `[${log_type}] - ${out_message}`,
    log_type
  );

  if (log_type === "ERROR") {
    console.error(text);
  } else if (process.env.NODE_ENV === "development") {
    console.log(text);
  }
};

const get_color_text = (message, log_type = "INFO") => {
  if (log_type === "ERROR") {
    return `\x1b[31m ${message} \x1b[0m`; // Red for ERROR
  }
  if (log_type === "WARNING") {
    return `\x1b[33m ${message} \x1b[0m`; // Yellow for WARNING
  }
  if (log_type === "INFO") {
    return `\x1b[32m ${message} \x1b[0m`; // Green for INFO (normal messages)
  }
  return message;
};

export { emit, get_color_text };
